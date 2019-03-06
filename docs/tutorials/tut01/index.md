---
title: "Tutorial 1: Hello p5.js"
tut_num: 1
layout: tutorial
---

<p class="lead">
  Note: There are no in-person tutorials in week 1. This is an online activity
  to familiarize yourself with p5js. The aim of this tutorial is to get you
  familiar with the p5js library. You will also write your first programming
  'sketch' with p5js.
</p>

## Watch the hello p5js video

P5js is a JavaScript library for creative coding. This short
[interactive video](http://hello.p5js.org/) gives an introduction to the p5js
project from the creator of p5js, Lauren McCarthy, and Daniel Shiffman. Make
sure you click around and explore how it works!

<a target="_blank" href="http://hello.p5js.org">
  <img src="{{site.baseurl}}{{page.url}}images/hello-p5js-org-lauren.png" alt="Link to hello.p5js.org welcome video">
</a>

<p class="info">
  <strong>Did you notice</strong> how the graphics in the video are interactive?
  That's all done with the p5 library (plus some other JavaScript libraries).
  I think it's a great demonstration of the power and potential of the web as
  a creative platform.
</p>

## Sign up for an account on the p5js web editor

The video below gives a quick introduction to the p5js web editor. It shows how
to sign up for an account, some of the settings, the parts of the interface,
how to run your sketches, and how to get a link that you can share with others.

{% include youtube.html id="KYHmZE9IbsU" %}

Go to the p5js online editor at
<a href="https://editor.p5js.org">https://editor.p5js.org</a>
and sign up for an account. Once you are signed in, the editor should look
something like the following picture (depending on what theme you've chosen).

![p5js web editor]({{site.baseurl}}{{page.url}}images/editor-p5js-parts.png)

<p class="task">
  <strong>Try it now:</strong> When you first open the editor, it will have some
  default code already filled in. If you press the <code>play</code> button, you
  will see what this default code does. You should see a grey square appear to
  the right of the code. This is the <code>canvas</code>, where p5js does most
  of its drawing.
</p>

## Explaining the parts of the code

First, see if you can identify the two blocks of the code that define the
`setup` and `draw` functions. These special functions are the 'skeleton' of a
p5js program and pretty-much every p5js sketch you write will have them.

The `setup` function runs once when the sketch first loads. It's where you
can create the drawing canvas that p5.js will use to display graphics, and where
you can set options like text formatting and the colours used for drawing.

The `draw` function runs over and over again as long as the sketch is running.
It controls how the sketch should evolve over time, including
animations and other dynamic elements of the sketch.

## Check out the p5js 'get started' guide

Now that you have an account on the p5js web editor and have seen some parts
of the code, you should follow the [get started](http://p5js.org/get-started/)
guide.

<p class="info">
  <strong>Note:</strong> The guide talks about downloading the library and
  running it locally. Since you're using the web editor, you don't need to do
  that part. If you want to try running p5js locally, follow the instructions
  below.
</p>

## (Optional) Set up a local text editor and server

If you prefer, you can set up a local text editor and server rather than working
on the online editor. The following video from Dan Shiffman gives a good
overview of what's involved in setting up to work on p5js locally.

<iframe width="560" height="315" src="https://www.youtube.com/embed/UCHzlUiDD10?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Any text editor will work for local development, but some text editors are
better than others :). Here are some that we recommend:

* Visual Studio Code
* Atom
* SublimeText

<p class="info">
  <strong>Note:</strong> You should be fine using the p5js online web editor for
  this unit, but for larger projects that you might take on in future, you will
  probably find a local setup easier to manage.
</p>

## Check out these other learning resources

* [books](https://p5js.org/books/)
* [examples](https://p5js.org/examples/)
* [learn](http://p5js.org/learn/)
* [resources](../../resources)
