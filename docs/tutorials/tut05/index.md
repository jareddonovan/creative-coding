---
title: "Tutorial 5: Sound and Image"
layout: tutorial
---

<p class="lead">
  In this week’s tutorial, we'll learn how to load and play sound files from
  within Processing. We’ll use the properties of sound to control how we
  draw images to the screen. The outcomes of the in-class activity will form
  part of the Assignment 1 submission.
</p>

## Before you start

<p class="task">
  <strong>Task:</strong> Take 5 minutes to brainstorm 3 ideas for how you could
  respond to the 'Sound and Image' part of assignment 1. We'll discuss your
  ideas in class and pick one to discuss for how you might code it.
</p>

## External libraries in p5.js

In this tutorial we'll use an external library. A library is a collection of
code that extends the functionality of p5.js. Libraries can help with adding
user interface elements, connecting to external sensors, and even with machine
learning tasks.

A collection of the most popular libraries is here:
[processing.org/reference/libraries/](https://processing.org/reference/libraries/)

<p class="task">
  <strong>Task:</strong> To extend p5.js's ability to work with sound, we
  will be using p5 sound library. Refer to the links below for
  information on how to add this to Processing and use it in your sketches.
</p>

* **[How to install a library](https://github.com/processing/processing/wiki/How-to-Install-a-Contributed-Library):**
  Explains how to install an external library so you can use it in Processing.
* **[Import](https://processing.org/reference/import.html):**
  Documents the `import` syntax you use to add a library to your sketch.
* **[Minim](http://code.compartmental.net/tools/minim/):**
  Home page for the `Minim` library, which is what we'll be using in this
  week's tutorial.
* **[Minim documentation](http://code.compartmental.net/minim/):**
  (Extensive) documentation for the Minim library.

Most libraries for Processing come with a set of example Processing sketches
that show how to use them in Processing. Once you have installed Minim,
you should be able to access these examples from Processing as follows:

* From the `File` menu, select `Examples...`
* A window titled `Java Examples` will open up.
* Scroll to the bottom and you will see a folder called
  `contributed libraries`.
* Inside that should be the Minim examples.

![Minim Examples]({{site.baseurl}}{{page.url}}images/processing-examples-dialog.png)

<p class="info">
  <strong>Info:</strong> The Minim library is fully featured and does
  far more than we want to cover for this week's tutorial. If you are a
  beginning student, don't feel intimidated. Focus on the following examples
  and you will learn all you need to know about Minim. But if you are a more
  advanced student, you should also feel free to look further into the Minim
  documentation and examples.
</p>

## 1) Loading and playing a sound

There're two sketches, to look at. Download the zips of these and run them
locally to see how they work.

<ul class="code-list">
 {% include captioned_card.html title="Sample Player" name="samplePlayer" example_dir="online-examples" do_not_link=true caption="Loads a sound into memory and plays on a key event. Good for sound effects and other short UI or game sounds" %}

</ul>

This example uses the `loadSample` function to load a sound file as a sample.
The `trigger` function triggers the sample when the user presses the right key.

<ul class="code-list">

{% include captioned_card.html title="Play a File" name="PlayAFile" example_dir="online-examples" do_not_link=true caption="Streams a sound file from its location. Good for longer audio tracks, loops etc. This example also draws the waveform by reading values from the audioBuffer. Like reading pixel colors from a bitmap." %}

</ul>

This example uses the `loadFile` function to load a sound file for playback.
It then uses the `play` function to start the file playing. Adapted from the
`PlayAFile` example supplied with Minim.

<div class="task">
  <strong>Task:</strong>
  <ul>
    <li>
      Compare the examples above with the examples they're based on to
      see what was changed (sources are listed in top comments).
    </li>
    <li>
      Notice the use of the <code>map</code> function to scale up the value of
      the <code>l</code> and <code>r</code> variables. Can you change the range
      that maps to?
    </li>
    <li>
      Try drawing other shapes instead of ellipses in the for loop to see what
      happens.
    </li>
  </ul>
</div>

### Minim playback functions

* **[Load File](http://code.compartmental.net/minim/minim_method_loadfile.html):**
  Documentation for the `loadFile` function. Loads the requested file into
  an `AudioPlayer` object.
* **[Play](http://code.compartmental.net/minim/audioplayer_method_play.html):**
  Documentation for the `play` function. Starts playback from the current
  position.
* **[Loop](http://code.compartmental.net/minim/audioplayer_method_loop.html):**
  Documentation for the `loop` function. Set the `AudioPlayer` to loop some
  number of times.
* **[Pause](http://code.compartmental.net/minim/audioplayer_method_pause.html):**
  Documentation for the `pause` function. Pauses playback.

## 2) Getting information from sounds

The following three sketches show how to measure sound information - either
from microphone input, or from a sample playing. This is a great way to make
interesting interactive works. Spend some time on these ones.

<ul class="code-list">

{% include captioned_card.html title="Monitor Audio Input" name="MonitorAudioInput" example_dir="online-examples" do_not_link=true caption="Monitors the volume from the microphone input and uses this to draw a simple ellipse at the bottom of the screen." %}

{% include captioned_card.html title="Sound Energy Beat Detection" name="SoundEnergyBeatDetection" example_dir="online-examples" do_not_link=true caption="A nice method to make an interaction from an audio file. Have a close look at it." %}

{% include captioned_card.html title="Frequency Energy Beat Detection" name="FrequencyEnergyBeatDetection" example_dir="online-examples" do_not_link=true caption="This is a more complex example for the advanced students. It also uses text which we've not seen yet" %}

</ul>

<div class="task">
  <strong>Task:</strong>
  <ul>
    <li>
      Review the examples above to understand how they're getting
      information from the audio input.
    </li>
    <li>
      Adapt the code to generate more interesting visual output triggered
      by the sound.
    </li>
    <li>
      Note the use of the `ellipseMode` function in the 'Sound Energy Beat
      Detection' example. What does this do?
      (<a href="https://processing.org/reference/ellipseMode_.html">reference</a>)
    </li>
  </ul>
</div>

### Minim sound information functions

* **[Position](http://code.compartmental.net/minim/audioplayer_method_position.html):**
  Documentation for the `position` function. Returns the current position of
  the "playhead" in milliseconds.
* **[Level](http://code.compartmental.net/minim/audiobuffer_method_level.html):**
  Documentation for the `level` function. Gets the current level of the buffer
* **[Waveforms](http://code.compartmental.net/minim/audiobuffer_method_get.html):**
  Documentation for the `get` function. Gets the i<sup>th</sup> sample in the
  buffer

## 3) Creating and analyzing sound

The following two examples show how to synthesize and analyse sound in more
complex ways. You are welcome to explore more complex examples if you're
interested. A good place to start is in the `Synthesis` and `Analysis`
sections of the Minim examples.

<ul class="code-list">

{% include captioned_card.html title="Synthesize Sound" name="SynthesizeSound" example_dir="online-examples" do_not_link=true caption="SynthesizeSound is a sketch which creates a basic oscillator and   lets the user manipulate the parameters: Frequency, Amplitude and waveform." %}

{% include captioned_card.html title="Analyse Sound" name="AnalyzeSound" example_dir="online-examples" do_not_link=true caption="FFT = Fast Fourier Transform - which converts a time domain signal into frequency domain.  In short, makes those EQ graphics showing different frequency bands." %}

</ul>

<p class="task">
  <strong>For the adventurous:</strong>
  See if you can adapt the Fast Fourier Transform (FFT) 'Analyse Sound'
  technique to create a more complex visualization of a sound. Consider
  triggering different visual effects based on different frequencies.
</p>  

## Building on this for Assignment 1

The aim of this tutorial is for you to get an understanding of what's possible,
with the Minim library. You should build on the examples presented above to
make something which involves sound and image for Assignment 1. Examples of
the kinds of sketches you might make are:

* A sample player triggered by mouse and key interaction, which also changes 
  images
* A sound responsive work using microphone input - volume changing image
* A sound responsive work using digital audio input - volume, beat or FFT data 
  changing image
* A sound-synthesis experiment.

## Examples from lecture

The following examples are from the lecture

<ul class="code-list">

{% include captioned_card.html name="simple_audio_input" example_dir="tutor-examples" do_not_link=true caption="A sketch which draws the current volume from the audio input." %}

{% include captioned_card.html name="beat_grid" example_dir="tutor-examples" do_not_link=true caption="Adapted from the beat detection above. Uses a song to generate a pleasing visual pattern. This shows how you can adapt the simple examples above to generate more complex and interesting visual outputs." %}

{% include captioned_card.html name="chirporchestra" example_dir="tutor-examples" do_not_link=true caption="(Advanced) Example shown in the lecture of how you can create a basic grid sequencer in Processing." %}

</ul>

## Further tutorial

<ul class="code-list">
  <li>
    <a class="title-link" target="_blank" href="https://processing.org/tutorials/sound/">Processing Sound Tutorial</a>
    <a class="img-link" target="_blank" href="https://processing.org/tutorials/sound/">
      <img src="/bbcswebdav/courses/DXB303_18se1/tutorials/tut05/images/sound_tutorial.png">
    </a>
    A detailed tutorial on the use of sound in Processing.
  </li>
</ul>