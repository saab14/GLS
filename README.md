<h1>How to install GLS</h1>
<ul>

<li><h3>Include CSS</h3>
<code>&lt;link rel='stylesheet/less' type='text/css' href='gls.css'&gt;</code>
</li><br />

<li><h3>Include jQuery</h3>
<code>&lt;script src='jquery.js'&gt;&lt;/script&gt;</code>
</li><br />

<li><h3>Include GLS</h3>
<code>&lt;script src='gls.js'&gt;&lt;/script&gt;</code>
</li><br /><br />

<h2>Gallery</h2>
<li><h3>Include GLS Gallery function call</h3>
<code>
&lt;script&gt;<br />
&nbsp;&nbsp;$( document ).ready(function() {<br />
&nbsp;&nbsp;&nbsp;$('#gallery').gallery({<br />
&nbsp;&nbsp;&nbsp;'imgCounter': true,<br />
&nbsp;&nbsp;&nbsp;'width': 165,<br />
&nbsp;&nbsp;&nbsp;'height': 95<br />
&nbsp;&nbsp;});<br />
&nbsp;});<br />
&lt;script&gt;
</code>
</li><br />

<li><h3>Create GLS Gallery</h3>
<code>
&lt;div class="mainGallery"&gt;<br />
&nbsp;&lt;ul id="gallery"&gt;<br />
&nbsp;&nbsp;&lt;li&gt;&lt;img src='image1.jpg' title='title1'&gt;&lt;/li&gt;<br />
&nbsp;&nbsp;&lt;li&gt;&lt;img src='image2.jpg' title='title2'&gt;&lt;/li&gt;<br />
&nbsp;&nbsp;&lt;li&gt;&lt;img src='image3.jpg' title='title3'&gt;&lt;/li&gt;<br />
&nbsp;&lt;/ul&gt;<br />
&lt;/div&gt;
</code>
</li><br /><br />

<h2>Lightbox</h2>
<li><h3>Use GLS Lightbox class to display a single image</h3>
<code>&lt;img src='image.jpg' class="lightbox" title="title"&gt;</code>
</li><br />

<li><h3>Zip several Lightbox class elements into a single container</h3>
<code>
&lt;div class="mainLightbox"&gt;<br />
&nbsp;&lt;img src='image1.jpg' class="lightbox" title="title1"&gt;<br />
&nbsp;&lt;img src='image2.jpg' class="lightbox" title="title2"&gt;<br />
&nbsp;&lt;img src='image3.jpg' class="lightbox" title="title3"&gt;<br />
&lt;/div&gt;
</code>
</li><br /><br />

<h2>Slideshow</h2>
<li><h3>Include GLS slideshow function call</h3>
<code>
&lt;script&gt;<br />
&nbsp;$( document ).ready(function() {<br />
&nbsp;&nbsp;$('#slideshow').slideshow({<br />
&nbsp;&nbsp;&nbsp;'height': 300,<br />
&nbsp;&nbsp;&nbsp;'fadeTime': 500,<br />
&nbsp;&nbsp;&nbsp;'intervalTime': 5000,<br />
&nbsp;&nbsp;&nbsp;'disc': true<br />
&nbsp;&nbsp;});<br />
&nbsp;});<br />
&lt;/script&gt;
</code>
</li>

<li><h3>Create the GLS slideshow</h3>
<code>
&lt;div class="mainSlideshow"&gt;<br />
&nbsp;&lt;ul id="slideshow"&gt;<br />
&nbsp;&nbsp;&lt;li&gt;&lt;img src='image1.jpg'&gt;&lt;/li&gt;<br />
&nbsp;&nbsp;&lt;li&gt;&lt;img src='image2.jpg'&gt;&lt;/li&gt;<br />
&nbsp;&nbsp;&lt;li&gt;&lt;img src='image3.jpg'&gt&lt;/li&gt;<br />
&nbsp;&lt;/ul&gt;<br />
&lt;/div&gt;<br />
</code>
</li>
</ul>

