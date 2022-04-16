/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {getFriendlyURL} from 'workbox-core/_private/getFriendlyURL.mjs';


describe(`getFriendlyURL()`, function() {
  it(`should return short URL for local origin '/'`, function() {
    const url = getFriendlyURL('/');
    expect(url).to.equal('/');
  });

  it(`should return short URL for local origin '<local origin>/hi'`, function() {
    const fullURL = new URL('/hi', self.location).toString();
    const url = getFriendlyURL(fullURL);
    expect(url).to.equal('/hi');
  });

  it(`should return full URL for external origin 'https://external-example.com/example'`, function() {
    const url = getFriendlyURL('https://external-example.com/example');
    expect(url).to.equal('https://external-example.com/example');
  });
});
