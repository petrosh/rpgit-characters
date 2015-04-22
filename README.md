# rpgit-characters
rpgit characters generator and architecture

- [seed](http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html#more)
- [json linter](https://www.jsoneditoronline.org/)
- [handlebars](http://handlebarsjs.com/)
- [handlebars helpers](https://github.com/diy/handlebars-helpers/tree/master/lib)
- [getResponseHeader method](http://help.dottoro.com/ljxsrgqe.php)
- [rawgit](https://rawgit.com/)

## Contributing

```shell
$ gem install sass
$ sass --watch css/style.scss
```

## Handlebars helper

```liquid
{{{link "See more..." story.url}}}
```

```javascript
Handlebars.registerHelper('link', function(text, url) {
  url = Handlebars.escapeExpression(url);
  text = Handlebars.escapeExpression(text);

  return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );
});
```

## Permalink to a file in a specific commit
For a permanent link to the specific version of a file that you see, instead of using a branch name in the URL (i.e. the master part in the example above), put a commit id. This will permanently link to the exact version of the file in that commit.

Instead of  
[github/hubot/blob/master/README.md](https://github.com/github/hubot/blob/master/README.md)

Use  
[github/hubot/blob/ed25584f5ac2520a6c28547ffd0961c7abd7ea49/README.md](https://github.com/github/hubot/blob/ed25584f5ac2520a6c28547ffd0961c7abd7ea49/README.md)
