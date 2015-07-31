IFRAMEr makes your components portable and your life easier.

If you look for a simple approach which helps creating reusable web components - IFRAMEr might be exactly what you need. This is a small JavaScript function that wraps your `html` markup with all `styles` and `scripts` you need for its work - into dynamically ccreated `iframe` element, so page can't suddenly break the original design of your component.

Total size for minified version of the script is 495 bytes gzipped (798 bytes uncompressed).
IFRAMEr has no dependencies, but it has support for custom tasks you can add. 

## Demo

Enjoy with the the demo on JsFiddle first: http://jsfiddle.net/vmysla/7rhgoeuq/1/

![IFRAMEr solved my problem](http://content.screencast.com/users/vmysla/folders/Default/media/f71f289a-fce4-444b-856a-86b8f3c7cce4/iframer.png)

Feel free to fork: `git clone https://github.com/vmysla/IFRAMEr`

## Get started 

Widget is any web component which is wrapped into IFRAME for its wide distribution in the web. 
You can create widgets from any frontend element you have on the page:

``` html
    ...
	<h1>This is a page</h1>
	...
	<!-- Let's say, this is the part of your page which you want to reuse on different sites: --> 
	<style> 
		b { color : red; } 
	</style>
	<div>
    	Hi! <br/> I'm simple <b id="term">html element</b>!
    </div>
    <script type="widget/javascript">
	    document.getElementById('term').innerHTML = 'web component';
	</script>
	...
```
It has own HTML markup, CSS styles and JavaScript code as well.
To make a widget - you have to put all those things into script tags with special type attributes: 

####1. Wrap your HTML code with the `script[type=widget/html]` tag
``` html
	<script type="widget/html">
		<style> 
			b { color : red; } 
		</style>
		<div>
	    	Hi! <br/> I'm simple <b id="term">web component</b>!
	    </div>
	</script>
```
####2. Put your JavaScript code for widget into script[widget/javascript], right after 1.
``` html
	<script type="widget/javascript">
	    document.getElementById('term').innerHTML = 'iframe widget';
	</script>
```
####3. Add IFRAMEr script just before closing body tag
``` html
     ...
     <script src="//rawgit.com/vmysla/IFRAMEr/master/dist/iframer.min.js"></script>
  </body>
```

Because all your markup and code are placed into own script tags - browser wouldn't render nor execute them.
In another hand, IFRAMEr is looking for such tags on your pages and replaces them with IFRAMEs it generates on fly. 

## Supported browsers

Currently it supports IE6+, FF3.5+, and rest of the modern browsers for Linux, Windows and Mac. 

## Google Analytics
As a bonus IFRAMEr automatically provides [Universal Google Analytics Web Tracker](https://developers.google.com/analytics/devguides/collection/analyticsjs/) (ga function) from the page into widget's IFRAME.

## License
MIT.
