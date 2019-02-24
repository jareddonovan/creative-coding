---
title: "Tutorial 5: Sound and Visualization"
tut_num: 5
layout: tutorial
---

<p class="lead">
  In this week’s tutorial, we'll learn how to make sound with p5.js.
  We’ll use the properties of sound to control how we draw images to the
  screen. The outcomes of the in-class activity will form part of the
  Assignment 1 submission.
</p>

## Before you start

<p class="task">
  <strong>Task:</strong> Take 5 minutes to brainstorm 3 ideas for how you could
  respond to the 'Sound and Image' part of assignment 1. We'll discuss your
  ideas in class and pick one to discuss for how you might code it.
</p>

## External libraries in p5.js

<!-- TODO: Add a diagram of how p5.js relates to javascript / html / css -->

In this tutorial we'll use the p5sound library. A library is a collection of
code that extends the functionality of p5.js. Libraries can help with adding
user interface elements, connecting to external sensors, and even with machine
learning tasks.

A collection of the most popular libraries is here:
[http://p5js.org/libraries/](http://p5js.org/libraries/)

We'll use the [p5.sound](http://p5js.org/reference/#/libraries/p5.sound)
library, which gives us the ability to work with sound files and create sounds.

The p5 online editor adds a link to the p5.sound library automatically. If you
are working locally, you may need to add it by hand. This
[link has instructions how](http://p5js.org/libraries/#using-a-library).

<p class="info">
  <strong>Info:</strong> The p5.sound library is and does
  far more than we want to cover for this week's tutorial. If you are a
  beginning student, don't feel intimidated. Focus on the following examples
  and you will learn all you need to know. But if you are a more
  advanced student, feel free to look further into the
  documentation and examples.
</p>

## Loading and playing a sound

There example below shows how to load and play a sound.

<ul class="code-list">

{% include example_card.html name="Load and play a sound" thumb="images/load-play-sound-screenshot.png" link="http://p5js.org/examples/sound-load-and-play-sound.html" caption="Loads and plays a sound file when the user clicks the mouse" %}

{% include example_card.html name="Playback rate" thumb="images/playback-rate-thumb.png" link="http://p5js.org/examples/sound-playback-rate.html" caption="Mouse position adjusts the playback speed and volume of a looping sound file." %}

</ul>

<div class="task">
  <strong>Task:</strong>
  <ul>
    <li>
      Try loading and playing your own audio file.
    </li>
    <li>
      Try changing the playback rate, volume, etc.
    </li>
  </ul>
</div>

### Playback functions in p5.sound

* **[loadSound](http://p5js.org/reference/#/p5.SoundFile/loadSound):**
  Documentation for the `loadSound` function. Loads the requested file into
  a `p5.soundFile` object from the specified path.
* **[play](http://p5js.org/reference/#/p5.SoundFile/play):**
  Starts playback on the sound file.
* **[loop](http://p5js.org/reference/#/p5.SoundFile/loop):**
  Set the `p5.soundFile` to loop. Adjust how long and how fast it loops.
* **[pause](http://p5js.org/reference/#/p5.SoundFile/pause):**
  Pauses playback of a sound file.

## Getting information from sounds

The following three sketches show how to measure sound information - either
from microphone input, or from a sample playing. This is a great way to make
interesting interactive works. Spend some time on these ones.

<ul class="code-list">

{% include example_card.html name="Monitor audio input" thumb="images/audio-input-screenshot.png" link="https://p5js.org/reference/#/p5.AudioIn" caption="Uses microphone input to move an ellipse." %}

{% include example_card.html name="Measure amplitude" thumb="images/measure-amplitude-thumb.png" link="https://p5js.org/examples/sound-measuring-amplitude.html" caption="Changes the size of an ellipse based on the volume of a looping audio file." %}

{% include example_card.html name="Beat detection" thumb="images/beat-detection-thumb.png" link="https://editor.p5js.org/awarua/sketches/BkBnH1qlN" caption="Plays a file and tries to draw an ellipse on the beat." %}

{% include example_card.html name="Draw waveform" thumb="images/draw-sound-waveform-thumb.png" link="https://editor.p5js.org/awarua/sketches/HJ1-WRFeV" caption="Plays a sound file and draws the waveform for the sound." %}

{% include example_card.html name="FFT analysis" thumb="images/play-a-file-thumb.png" link="https://editor.p5js.org/awarua/sketches/B1jGusKe4" caption="Plays a file and draws circles based on the frequencies of the sound." %}

<!-- TODO: I *think* it should be possible to achieve something similar in 
           p5.sound, but will need more time to figure it out...

{% include example_card.html name="Frequency Energy beat detection" thumb="images/fft-beat-detection-thumb.png" link="https://editor.p5js.org/awarua/sketches/SyOwiJqxV" caption="Tries to identify beats at different frequencies in a sound file." %}

-->

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
  </ul>
</div>

### Sound information functions

* **[currentTime](http://p5js.org/reference/#/p5.SoundFile/currentTime):**
  Returns the current position of the "playhead" in seconds.
* **[p5.Amplitude](http://p5js.org/reference/#/p5.Amplitude):**
  Documentation for the `p5.Amplitude` object. Gets the current volume of a sound

<!-- TODO: I don't think this is directly translateable
* **[Waveforms](http://code.compartmental.net/minim/audiobuffer_method_get.html):**
  Documentation for the `get` function. Gets the i<sup>th</sup> sample in the
  buffer
-->

## Creating and analyzing sound

The following two examples show how to synthesize and analyse sound. You are
welcome to explore more complex examples if you're interested.

<!-- TODO: Link to p5.sound functions for this

<ul class="code-list">

{% include captioned_card.html title="Synthesize Sound" name="SynthesizeSound" example_dir="online-examples" do_not_link=true caption="SynthesizeSound is a sketch which creates a basic oscillator and   lets the user manipulate the parameters: Frequency, Amplitude and waveform." %}

{% include captioned_card.html title="Analyse Sound" name="AnalyzeSound" example_dir="online-examples" do_not_link=true caption="FFT = Fast Fourier Transform - which converts a time domain signal into frequency domain.  In short, makes those EQ graphics showing different frequency bands." %}

</ul>

-->

* [Noise drum envelope](https://p5js.org/examples/sound-noise-drum-envelope.html)
* [Note envelope](https://p5js.org/examples/sound-note-envelope.html)
* [Oscillator frequency](https://p5js.org/examples/sound-oscillator-frequency.html)
* [Frequency spectrum](https://p5js.org/examples/sound-frequency-spectrum.html)
* [Mic threshold](https://p5js.org/examples/sound-mic-threshold.html)
* [Filter low pass](https://p5js.org/examples/sound-filter-lowpass.html)
* [Filter band pass](https://p5js.org/examples/sound-filter-bandpass.html)
* [Frequency modulation](https://p5js.org/examples/sound-frequency-modulation.html)
* [Amplitude modulation](https://p5js.org/examples/sound-amplitude-modulation.html)

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

* A sample player triggered by mouse and keyboard interaction, which also changes
  images
* A sound responsive work using microphone input - volume changing image
* A sound responsive work using digital audio input - volume, beat or FFT data
  changing image
* A sound-synthesis experiment.

## Example from lecture

The following example is from the lecture

<ul class="code-list">

<!-- TODO: I'm not sure it's worth porting the following to p5.js

{% include captioned_card.html name="simple_audio_input" example_dir="tutor-examples" do_not_link=true caption="A sketch which draws the current volume from the audio input." %}

{% include captioned_card.html name="beat_grid" example_dir="tutor-examples" do_not_link=true caption="Adapted from the beat detection above. Uses a song to generate a pleasing visual pattern. This shows how you can adapt the simple examples above to generate more complex and interesting visual outputs." %}

-->

{% include example_card.html name="chirporchestra" thumb="images/chirporchestra-thumb.png" link="https://editor.p5js.org/awarua/sketches/HyRUMW9x4" caption="(Advanced) Example shown in the lecture of how you can create a basic grid sequencer in p5.js." %}

</ul>

<!-- TODO: The Processing sound tutorial isn't ported to p5.js yet.

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

-->