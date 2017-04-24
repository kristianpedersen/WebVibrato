# WebVibrato

My MIDI keyboard doesn't have a pitch/mod wheel, so I set out to make a fun browser tool.

Software synthesizers don't always use the modwheel for vibrato. It would be kind of silly for lush strings to have vibrato. 

WebVibrato doesn't do modwheel control - it simply shifts the pitchbend really, really fast. 

![Image showing how WebVibrato controls pitch bend instead of mod wheel.]
(pbvibrato.png)

WebVibrato has three rows:
* Vibrato
* Upwards pitch slides
* Downwards pitch slides

Requirements:
* Google Chrome, version 43+
* Virtual MIDI port
  * [Windows](http://www.nerds.de/en/download.html)
  * [OSX](https://help.ableton.com/hc/en-us/articles/209774225-Using-virtual-MIDI-buses-in-Live) (Works for any DAW)