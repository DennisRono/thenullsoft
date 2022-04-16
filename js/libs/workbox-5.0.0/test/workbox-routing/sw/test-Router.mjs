/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {Route} from 'workbox-routing/Route.mjs';
import {Router} from 'workbox-routing/Router.mjs';
import {dispatchAndWaitUntilDone} from '../../../infra/testing/helpers/extendable-event-utils.mjs';
import generateTestVariants from '../../../infra/testing/generate-variant-tests';


describe(`Router`, function() {
  const sandbox = sinon.createSandbox();
  const MATCH = () => {};
  const HANDLER = {handle: () => {}};
  const METHOD = 'POST';
  const EXPECTED_RESPONSE_BODY = 'test body';

  beforeEach(async function() {
    sandbox.restore();

    // Spy on all added event listeners so they can be removed.
    sandbox.spy(self, 'addEventListener');
  });

  afterEach(function() {
    for (const args of self.addEventListener.args) {
      self.removeEventListener(...args);
    }
    sandbox.restore();
  });

  describe(`constructor`, function() {
    it(`should construct without any inputs`, function() {
      expect(() => {
        new Router();
      }).to.not.throw();
    });
  });

  describe(`registerRoute()`, function() {
    const invalidMatches = [{}, true, false, 123, '123', [123], null, undefined];
    generateTestVariants(`should throw in dev when route.match is not a function`, invalidMatches, async function(variant) {
      if (process.env.NODE_ENV === 'production') return this.skip();

      const router = new Router();
      await expectError(
          () => router.registerRoute({handler: HANDLER, method: METHOD, match: variant}),
          'missing-a-method',
          (error) => {
            expect(error.details).to.have.property('moduleName').that.eql('workbox-routing');
            expect(error.details).to.have.property('className').that.eql('Router');
            expect(error.details).to.have.property('funcName').that.eql('registerRoute');
            expect(error.details).to.have.property('paramName').that.eql('route');
            expect(error.details).to.have.property('expectedMethod').that.eql('match');
          });
    });

    const invalidHandlers = [() => {}, true, false, 123, '123', undefined];
    generateTestVariants(`should throw in dev when route.handler is not an object`, invalidHandlers, async function(variant) {
      if (process.env.NODE_ENV == 'production') return this.skip();

      const router = new Router();
      await expectError(
          () => router.registerRoute({match: MATCH, method: METHOD, handler: variant}),
          'incorrect-type',
          (error) => {
            expect(error.details).to.have.property('moduleName').that.eql('workbox-routing');
            expect(error.details).to.have.property('className').that.eql('Router');
            expect(error.details).to.have.property('funcName').that.eql('registerRoute');
            expect(error.details).to.have.property('paramName').that.eql('route');
            expect(error.details).to.have.property('expectedType').that.eql('object');
          }
      );
    });

    const invalidMethods = [() => {}, {}, true, false, 123, [123], null, undefined];
    generateTestVariants(`should throw in dev when route.method is not a string`, invalidMethods, async function(variant) {
      if (process.env.NODE_ENV == 'production') return this.skip();

      const router = new Router();
      await expectError(
          () => router.registerRoute({match: MATCH, handler: HANDLER, method: variant}),
          'incorrect-type',
          (error) => {
            expect(error.details).to.have.property('moduleName').that.eql('workbox-routing');
            expect(error.details).to.have.property('className').that.eql('Router');
            expect(error.details).to.have.property('funcName').that.eql('registerRoute');
            expect(error.details).to.have.property('paramName').that.eql('route.method');
            expect(error.details).to.have.property('expectedType').that.eql('string');
          }
      );
    });

    it(`should throw in dev when route.handler.handle is not a function`, async function() {
      if (process.env.NODE_ENV === 'production') return this.skip();

      const router = new Router();
      await expectError(
          () => router.registerRoute({match: MATCH, method: METHOD, handler: {}}),
          'missing-a-method',
          (error) => {
            expect(error.details).to.have.property('moduleName').that.eql('workbox-routing');
            expect(error.details).to.have.property('className').that.eql('Router');
            expect(error.details).to.have.property('funcName').that.eql('registerRoute');
            expect(error.details).to.have.property('paramName').that.eql('route.handler');
            expect(error.details).to.have.property('expectedMethod').that.eql('handle');
          }
      );
    });

    it(`should add the expected entries to the internal arrays of routes`, function() {
      const router = new Router();

      // Routes without an explicit method will default to GET.
      const getRoute1 = new Route(MATCH, HANDLER);
      const getRoute2 = new Route(MATCH, HANDLER, 'GET');
      const putRoute1 = new Route(MATCH, HANDLER, 'PUT');
      const putRoute2 = new Route(MATCH, HANDLER, 'PUT');
      // We support passing in Objects that match the expected interface in addition to Routes.
      const postRoute = {
        match: MATCH,
        handler: HANDLER,
        method: 'POST',
      };

      for (const route of [getRoute1, getRoute2, putRoute1, putRoute2, postRoute]) {
        router.registerRoute(route);
      }

      expect(router.routes.get('GET')).to.have.members([getRoute1, getRoute2]);
      expect(router.routes.get('PUT')).to.have.members([putRoute1, putRoute2]);
      expect(router.routes.get('POST')).to.have.members([postRoute]);
    });
  });

  describe(`addFetchListener`, function() {
    it(`should add a listener to respond to fetch events`, async function() {
      const router = new Router();
      const route = new Route(
          () => true,
          () => new Response(EXPECTED_RESPONSE_BODY));
      router.registerRoute(route);
      router.addFetchListener();

      sandbox.spy(router, 'handleRequest');

      const request = new Request(location);
      const fetchEvent = new FetchEvent('fetch', {request});

      await dispatchAndWaitUntilDone(fetchEvent);

      expect(router.handleRequest.callCount).to.equal(1);
      expect(router.handleRequest.args[0][0].request).to.equal(request);
      expect(router.handleRequest.args[0][0].event).to.equal(fetchEvent);
      expect(fetchEvent.respondWith.callCount).to.equal(1);

      const response = fetchEvent.respondWith.args[0][0];
      expect(await response.text()).to.equal(EXPECTED_RESPONSE_BODY);
    });

    it(`should not call respondWith when no routes match`, async function() {
      const router = new Router();
      const route = new Route(
          () => false,
          () => new Response(EXPECTED_RESPONSE_BODY));
      router.registerRoute(route);
      router.addFetchListener();

      sandbox.spy(router, 'handleRequest');

      const request = new Request(location.href + '?foo');
      const fetchEvent = new FetchEvent('fetch', {request});

      await dispatchAndWaitUntilDone(fetchEvent);

      expect(router.handleRequest.callCount).to.equal(1);
      expect(fetchEvent.respondWith.callCount).to.equal(0);
    });
  });

  describe(`addCacheListener`, function() {
    it(`should add a listener to respond to cache message events`, async function() {
      const router = new Router();
      const route = new Route(
          () => true,
          () => new Response(EXPECTED_RESPONSE_BODY));
      router.registerRoute(route);
      router.addCacheListener();

      sandbox.spy(router, 'handleRequest');

      const messageEvent = new ExtendableMessageEvent('message', {
        data: {
          type: 'CACHE_URLS',
          payload: {
            urlsToCache: ['/one', '/two', '/three'],
          },
        },
      });
      sandbox.stub(messageEvent, 'ports').value([{postMessage: sinon.spy()}]);

      await dispatchAndWaitUntilDone(messageEvent);

      expect(router.handleRequest.callCount).to.equal(3);
      expect(router.handleRequest.args[0][0].request.url).to.equal(`${location.origin}/one`);
      expect(router.handleRequest.args[1][0].request.url).to.equal(`${location.origin}/two`);
      expect(router.handleRequest.args[2][0].request.url).to.equal(`${location.origin}/three`);
      expect(messageEvent.waitUntil.callCount).to.equal(1);
      expect(messageEvent.waitUntil.args[0][0]).to.be.instanceOf(Promise);
      expect(messageEvent.ports[0].postMessage.callCount).to.equal(1);
    });

    it(`should accept URL strings or request URL+requestInit tuples`, async function() {
      const router = new Router();
      const route = new Route(
          () => true,
          () => new Response(EXPECTED_RESPONSE_BODY));
      router.registerRoute(route);
      router.addCacheListener();

      sandbox.spy(router, 'handleRequest');

      await dispatchAndWaitUntilDone(new ExtendableMessageEvent('message', {
        data: {
          type: 'CACHE_URLS',
          payload: {
            urlsToCache: [
              '/one',
              ['/two', {mode: 'no-cors'}],
              '/three',
            ],
          },
        },
      }));

      expect(router.handleRequest.callCount).to.equal(3);
      expect(router.handleRequest.args[0][0].request.url).to.equal(`${location.origin}/one`);
      expect(router.handleRequest.args[1][0].request.url).to.equal(`${location.origin}/two`);
      expect(router.handleRequest.args[1][0].request.mode).to.equal('no-cors');
      expect(router.handleRequest.args[2][0].request.url).to.equal(`${location.origin}/three`);
    });

    it(`should do nothing for non CACHE_URLS message types`, async function() {
      const router = new Router();
      const route = new Route(
          () => true,
          () => new Response(EXPECTED_RESPONSE_BODY));
      router.registerRoute(route);
      router.addCacheListener();

      sandbox.spy(router, 'handleRequest');

      await dispatchAndWaitUntilDone(new ExtendableMessageEvent('message'));

      expect(router.handleRequest.callCount).to.equal(0);
    });
  });

  describe(`unregisterRoute()`, function() {
    it(`should remove the expected entries from the internal arrays of routes`, function() {
      const router = new Router();

      // Routes without an explicit method will default to GET.
      const getRoute1 = new Route(MATCH, HANDLER);
      const getRoute2 = new Route(MATCH, HANDLER, 'GET');
      const putRoute1 = new Route(MATCH, HANDLER, 'PUT');
      const putRoute2 = new Route(MATCH, HANDLER, 'PUT');
      // We support passing in Objects that match the expected interface in addition to Routes.
      const postRoute = {
        match: MATCH,
        handler: HANDLER,
        method: 'POST',
      };

      for (const route of [getRoute1, getRoute2, putRoute1, putRoute2, postRoute]) {
        router.registerRoute(route);
      }

      router.unregisterRoute(getRoute2);
      router.unregisterRoute(putRoute2);

      expect(router.routes.get('GET')).to.have.members([getRoute1]);
      expect(router.routes.get('PUT')).to.have.members([putRoute1]);
      expect(router.routes.get('POST')).to.have.members([postRoute]);
    });

    it(`should throw when called with a route with a method for which there isn't an array of routes`, function() {
      const router = new Router();

      // Routes without an explicit method will default to GET.
      const getRoute = new Route(MATCH, HANDLER, 'GET');
      const putRoute = new Route(MATCH, HANDLER, 'PUT');

      router.registerRoute(getRoute);
      return expectError(
          () => router.unregisterRoute(putRoute),
          'unregister-route-but-not-found-with-method',
          (error) => {
            expect(error.details).to.have.property('method').that.eql('PUT');
          }
      );
    });

    it(`should throw when called with a route that wasn't previously registered`, function() {
      const router = new Router();

      // Routes without an explicit method will default to GET.
      const getRoute1 = new Route(MATCH, HANDLER, 'GET');
      const getRoute2 = new Route(MATCH, HANDLER, 'GET');

      router.registerRoute(getRoute1);
      return expectError(
          () => router.unregisterRoute(getRoute2),
          'unregister-route-route-not-registered'
      );
    });
  });

  describe(`setDefaultHandler()`, function() {
    it(`should update the expected internal state`, function() {
      const router = new Router();
      router.setDefaultHandler(HANDLER);

      expect(router._defaultHandler).to.eql(HANDLER);
    });

    it(`should return a response from the default handler when there's no matching route`, async function() {
      const router = new Router();
      const route = new Route(
          () => false,
          () => new Response(),
      );
      router.registerRoute(route);
      router.setDefaultHandler(() => new Response(EXPECTED_RESPONSE_BODY));

      // route.match() always returns false, so the Request details don't matter.
      const request = new Request(location);
      const event = new FetchEvent('fetch', {request});
      const response = await router.handleRequest({request, event});

      const responseBody = await response.text();

      expect(responseBody).to.eql(EXPECTED_RESPONSE_BODY);
    });
  });

  describe(`setCatchHandler()`, function() {
    it(`should update the expected internal state`, function() {
      const router = new Router();
      router.setCatchHandler(HANDLER);

      expect(router._catchHandler).to.deep.eql(HANDLER);
    });

    it(`should return a response from the catch handler when the matching route's handler rejects async`, async function() {
      const router = new Router();
      const route = new Route(
          () => true,
          () => Promise.reject(),
      );
      router.registerRoute(route);
      router.setCatchHandler(() => new Response(EXPECTED_RESPONSE_BODY));

      // route.match() always returns false, so the Request details don't matter.
      const request = new Request(location);
      const event = new FetchEvent('fetch', {request});
      const response = await router.handleRequest({request, event});
      const responseBody = await response.text();

      expect(responseBody).to.eql(EXPECTED_RESPONSE_BODY);
    });

    it(`should return a response from the catch handler when the matching route's handler throws sync`, async function() {
      const router = new Router();
      const route = new Route(
          () => true,
          () => {
            throw new Error(`Injected sync error`);
          },
      );
      router.registerRoute(route);
      router.setCatchHandler(() => new Response(EXPECTED_RESPONSE_BODY));

      // route.match() always returns false, so the Request details don't matter.
      const request = new Request(location);
      const event = new FetchEvent('fetch', {request});
      const response = await router.handleRequest({request, event});
      const responseBody = await response.text();

      expect(responseBody).to.eql(EXPECTED_RESPONSE_BODY);
    });
  });

  describe(`handleRequest()`, function() {
    it(`should throw in dev when not passed a request`, async function() {
      if (process.env.NODE_ENV === 'production') return this.skip();

      const router = new Router();
      const request = new Request(location);
      const event = new FetchEvent('fetch', {request});

      await expectError(
          () => router.handleRequest({event}),
          'incorrect-class',
          (error) => {
            expect(error.details).to.have.property('moduleName').that.eql('workbox-routing');
            expect(error.details).to.have.property('className').that.eql('Router');
            expect(error.details).to.have.property('funcName').that.eql('handleRequest');
            expect(error.details).to.have.property('paramName').that.eql('options.request');
          });
    });

    it(`should return a response from the Route's handler when there's a matching route`, async function() {
      const router = new Router();
      const route = new Route(
          () => true,
          () => new Response(EXPECTED_RESPONSE_BODY),
      );
      router.registerRoute(route);

      // route.match() always returns true, so the Request details don't matter.
      const request = new Request(location);
      const event = new FetchEvent('fetch', {request});
      const response = await router.handleRequest({request, event});
      const responseBody = await response.text();

      expect(responseBody).to.eql(EXPECTED_RESPONSE_BODY);
    });

    it(`should return a response from the first matching route when there are multiple potential matches`, async function() {
      const router = new Router();
      const response1 = 'response1';
      const response2 = 'response2';
      const route1 = new Route(
          () => true,
          () => new Response(response1),
      );
      router.registerRoute(route1);
      const route2 = new Route(
          () => true,
          () => new Response(response2),
      );
      router.registerRoute(route2);

      // route.match() always returns true, so the Request details don't matter.
      const request = new Request(location);
      const event = new FetchEvent('fetch', {request});
      const response = await router.handleRequest({request, event});
      const responseBody = await response.text();

      expect(responseBody).to.eql(response1);
    });

    it(`should work when no event is passed`, async function() {
      const router = new Router();
      const route = new Route(
          () => true,
          () => new Response(EXPECTED_RESPONSE_BODY),
      );
      router.registerRoute(route);

      // route.match() always returns true, so the Request details don't matter.
      const request = new Request(location);
      const response = await router.handleRequest({request});
      const responseBody = await response.text();

      expect(responseBody).to.eql(EXPECTED_RESPONSE_BODY);
    });

    it(`should work when request and event.request are different`, async function() {
      const router = new Router();
      const route = new Route(
          () => true,
          ({url}) => {
            // Ensure request (not event.request) is passed to the handler.
            if (url.href !== 'https://unexpected.com') {
              return new Response(EXPECTED_RESPONSE_BODY);
            }
          }
      );
      router.registerRoute(route);

      // route.match() always returns true, so the Request details don't matter.
      const request1 = new Request(location);
      const request2 = new Request('https://unexpected.com');

      const event = new FetchEvent('fetch', {request: request2});
      const response = await router.handleRequest({request: request1, event});
      const responseBody = await response.text();

      expect(responseBody).to.eql(EXPECTED_RESPONSE_BODY);
    });

    it(`should not return a response when there's no matching route and no default handler`, async function() {
      const router = new Router();
      const route = new Route(
          () => false,
          () => new Response(),
      );
      router.registerRoute(route);

      // route.match() always returns false, so the Request details don't matter.
      const request = new Request(location);
      const event = new FetchEvent('fetch', {request});
      const response = await router.handleRequest({request, event});

      expect(response).not.to.exist;
    });

    it(`should not respond to non-http requests`, function() {
      const router = new Router();

      // route.match() always returns false, so the Request details don't matter.
      const request = new Request(`example://test.com`);
      const event = new FetchEvent('fetch', {request});
      const response = router.handleRequest({request, event});

      expect(response).not.to.exist;
    });

    it(`should invoke route handlers with the correct arguments`, async function() {
      const router = new Router();
      const match = sandbox.stub()
          .onCall(0).returns(true)
          .onCall(1).returns([1, 2, 3]);

      const handler = sandbox.stub().returns(new Response());

      const route = new Route(match, handler);
      router.registerRoute(route);

      const url = new URL('/one', location);
      const request = new Request(url);
      const event = new FetchEvent('fetch', {request});

      await router.handleRequest({request});
      await router.handleRequest({request, event});

      expect(handler.callCount).to.equal(2);
      expect(handler.firstCall.args[0].url).to.deep.equal(url);
      expect(handler.firstCall.args[0].request).to.equal(request);
      expect(handler.firstCall.args[0].event).to.equal(undefined);
      expect(handler.firstCall.args[0].params).to.equal(undefined);

      expect(handler.secondCall.args[0].url).to.deep.equal(url);
      expect(handler.secondCall.args[0].request).to.equal(request);
      expect(handler.secondCall.args[0].event).to.equal(event);
      expect(handler.secondCall.args[0].params).to.deep.equal([1, 2, 3]);
    });

    const matchCallbackReturnValues = [{a: 'b'}, [1, 2], 'test'];
    generateTestVariants(`should pass the matchCallback return value to handlerCallback as params`, matchCallbackReturnValues, async function(returnValue) {
      const handlerCallbackStub = sinon.stub().resolves(new Response());
      const router = new Router();
      const route = new Route(
          sinon.stub().returns(returnValue),
          handlerCallbackStub,
      );
      router.registerRoute(route);

      const request = new Request(location);
      const event = new FetchEvent('fetch', {request});
      await router.handleRequest({request, event});

      expect(handlerCallbackStub.calledOnce).to.be.true;
      expect(handlerCallbackStub.firstCall.args[0].params).to.eql(returnValue);
    });

    it(`should not throw for router with no-routes set`, function() {
      const router = new Router();

      const request = new Request(location);
      const event = new FetchEvent('fetch', {request});
      router.handleRequest({request, event});
    });
  });

  describe(`findMatchingRoute()`, function() {
    it(`should throw in dev when not passed a URL`, async function() {
      if (process.env.NODE_ENV === 'production') return this.skip();

      const router = new Router();
      const url = new URL(location.href);
      const request = new Request(url);
      const event = new FetchEvent('fetch', {request});

      await expectError(
          () => router.findMatchingRoute({request, event}),
          'incorrect-class',
          (error) => {
            expect(error.details).to.have.property('moduleName').that.eql('workbox-routing');
            expect(error.details).to.have.property('className').that.eql('Router');
            expect(error.details).to.have.property('funcName').that.eql('findMatchingRoute');
            expect(error.details).to.have.property('paramName').that.eql('options.url');
          });
    });

    it(`should throw in dev when not passed a request`, async function() {
      if (process.env.NODE_ENV === 'production') return this.skip();

      const router = new Router();
      const url = new URL(location.href);
      const request = new Request(url);
      const event = new FetchEvent('fetch', {request});

      await expectError(
          () => router.findMatchingRoute({url, event}),
          'incorrect-class',
          (error) => {
            expect(error.details).to.have.property('moduleName').that.eql('workbox-routing');
            expect(error.details).to.have.property('className').that.eql('Router');
            expect(error.details).to.have.property('funcName').that.eql('findMatchingRoute');
            expect(error.details).to.have.property('paramName').that.eql('options.request');
          });
    });

    it(`should return the first matching route`, function() {
      const router = new Router();

      const match1 = sandbox.stub().returns(false);
      const route1 = new Route(match1, () => new Response());
      router.registerRoute(route1);

      const match2 = sandbox.stub().returns(true);
      const route2 = new Route(match2, () => new Response());
      router.registerRoute(route2);

      const match3 = sandbox.stub().returns(false);
      const route3 = new Route(match2, () => new Response());
      router.registerRoute(route3);

      const url = new URL(location.href);
      const request = new Request(url);
      const event = new FetchEvent('fetch', {request});

      const {route} = router.findMatchingRoute({url, request, event});

      expect(match1.callCount).to.equal(1);
      expect(match2.callCount).to.equal(1);
      expect(match3.callCount).to.equal(0);

      expect(route).to.equal(route2);
    });

    it(`should invoke route match functions with the correct arguments`, function() {
      const router = new Router();

      const match1 = sandbox.stub().returns(false);
      const route1 = new Route(match1, () => new Response());
      router.registerRoute(route1);

      const match2 = sandbox.stub().returns(true);
      const route2 = new Route(match2, () => new Response());
      router.registerRoute(route2);

      const url = new URL(location.href);
      const request = new Request(url);
      const event = new FetchEvent('fetch', {request});

      const {route} = router.findMatchingRoute({url, request, event});

      expect(match1.callCount).to.equal(1);
      expect(match1.args[0][0].url).to.deep.equal(url);
      expect(match1.args[0][0].request).to.equal(request);
      expect(match1.args[0][0].event).to.equal(event);

      expect(match2.callCount).to.equal(1);
      expect(match2.args[0][0].url).to.deep.equal(url);
      expect(match2.args[0][0].request).to.equal(request);
      expect(match2.args[0][0].event).to.equal(event);

      expect(route).to.equal(route2);
    });

    it(`should return the route and params (if applicable)`, function() {
      const router = new Router();
      const match = sandbox.stub()
          .onCall(0).returns(true)
          .onCall(1).returns('truthy')
          .onCall(2).returns([1, 2, 3])
          .onCall(3).returns([])
          .onCall(4).returns({a: 1})
          .onCall(5).returns({});

      const route = new Route(match, () => new Response());
      router.registerRoute(route);

      const url = new URL(location.href);
      const request = new Request(url);
      const event = new FetchEvent('fetch', {request});

      const result1 = router.findMatchingRoute({url, request, event});
      expect(result1.route).to.equal(route);
      expect(result1.params).to.equal(undefined);

      const result2 = router.findMatchingRoute({url, request, event});
      expect(result2.route).to.equal(route);
      expect(result2.params).to.equal('truthy');

      const result3 = router.findMatchingRoute({url, request, event});
      expect(result3.route).to.equal(route);
      expect(result3.params).to.deep.equal([1, 2, 3]);

      const result4 = router.findMatchingRoute({url, request, event});
      expect(result4.route).to.equal(route);
      expect(result4.params).to.equal(undefined);

      const result5 = router.findMatchingRoute({url, request, event});
      expect(result5.route).to.equal(route);
      expect(result5.params).to.deep.equal({a: 1});

      const result6 = router.findMatchingRoute({url, request, event});
      expect(result6.route).to.equal(route);
      expect(result6.params).to.equal(undefined);
    });
  });
});
