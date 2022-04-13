const list = [
    {
      "title": "Old Man's War",
      "author": "John Scalzi",
      "tags": ["fiction"]
    },
    {
      "title": "The Lock Artist",
      "author": "Steve",
      "tags": ["thriller"]
    }
  ];
const options = {
    includeScore: true,
    keys: ['author', 'tags']
}
const fuse = new Fuse(list, options)
const result = fuse.search('steve')
console.log(result)