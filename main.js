const buttonKeys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];
const buttons = document.getElementsByName("pb-btn");
const deviceList = document.getElementById("input-output-devices");
const deviceListHTML = [];
const pbSlider = document.getElementById("vibrato-amount");

let eventArray = [];
let lastTime = 0;
let lastVibratoTime = 0;
let modulationAmount = pbSlider.value;
let selectedMIDIoutput = "";
let stopbend = false;
let time = 0;
let vibratoTime = 0;

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("keydown", () => handleButtonAction(this, event));
    document.body.addEventListener("keyup", () => handleButtonAction(this, event));
    pbSlider.addEventListener("input", () => {
        modulationAmount = pbSlider.value;
        drawWaveforms();
    });
});

WebMidi.enable(error => {
    if (error) {
        document.getElementById("app").style.display = "none";
        // document.write("<p><span style='background-color: #e05269; color: white; padding: 5px; border-radius: 5px;'>\"" + error + "\"</span></p>");
        document.write(`<p><span style="background-color: #e05269; color: white; padding: 5px; border-radius: 5px;"> ${error}</span></p>`);
        document.write('<ol><li>Use <a href="https://www.google.no/chrome/browser/desktop/index.html"><img src="https://www.google.com/images/icons/product/chrome-32.png" width="16" /> Google Chrome</a></li>');
        document.write('<li>Install virtual MIDI port:');
        document.write('<ul><li>Windows: <a href="http://www.nerds.de/en/download.html">http://www.nerds.de/en/download.html</a></li>');
        document.write('<li>Mac OSX: <a href="https://help.ableton.com/hc/en-us/articles/209774225-Using-virtual-MIDI-buses-in-Live">https://help.ableton.com/hc/en-us/articles/209774225-Using-virtual-MIDI-buses-in-Live</a></li></ul></li>');
        document.getElementById("app").style.display = "none";
    } else {

        deviceListHTML.push("<div id='output' class='midi-section'>");
        deviceListHTML.push("<form id='output'>");

        WebMidi.outputs.forEach((output, i) => {
            deviceListHTML.push(`<label for"output" id="outputLabel"><input id="${i}" onclick="selectMIDIOutput()" type="radio" name="output" value="${output.name}">${output.name}</label>`);
        });

        deviceListHTML.push("</form>");
        deviceListHTML.push("</div>");

        output = WebMidi.outputs[0];
        deviceList.innerHTML = deviceListHTML.join("");
    }
})

function selectMIDIOutput() {
    selectedMIDIoutput = document.querySelector('input[name="output"]:checked').value;
    document.getElementById("outputLabel").classList.add("selected");
}

function handleButtonAction(obj, event) {
    if (buttonKeys.includes(event.key.toLowerCase())) {
        buttons.forEach(button => {
            if (button.innerHTML.trim().charAt(0).toLowerCase() === event.key.toLowerCase()) {
                if (event.type == "keydown") {
                    button.classList.add("selected");
                    activatePitchBend(button.id, true);
                    eventArray.push(event);
                    stopbend = false;
                } else {
                    button.classList.remove("selected");
                    activatePitchBend(button.id, false);
                    eventArray = [];
                    stopbend = true;
                }
            }
        })
    }
}

function activatePitchBend(buttonText, play) {
    let speed = buttonText.split("-")[0]; // -> "slow-", "medium-", "fast-"
    let type = buttonText.split("-")[1]; // -> "vibrato", "pitchup", "pitchdown"
    let pbspeed = 0;

    if (eventArray.length === 0 && play && time === 0) {
        wave = setInterval(() => {
            lastTime = time;
            time++;
            switch (speed) {
                case "slow":
                    pbspeed = 0.01;
                    break;
                case "medium":
                    pbspeed = 0.1;
                    break;
                case "fast":
                    pbspeed = 0.25;
                    break;
            }
            switch (type) {
                case "vibrato":
                    lastVibratoTime = (Math.sin(lastTime * pbspeed) * modulationAmount);
                    vibratoTime = (Math.sin(time * pbspeed) * modulationAmount);
                    output.sendPitchBend(vibratoTime, 1);
                    break;
                case "pitchup":
                    threshold = 10 / pbspeed;
                    if (time > threshold) { time = threshold };
                    output.sendPitchBend((time / threshold) * modulationAmount * 4, 1);
                    break;
                case "pitchdown":
                    threshold = 10 / pbspeed;
                    if (time > threshold) { time = threshold };
                    output.sendPitchBend(((time / threshold) * modulationAmount * 4) * -1, 1);
                    break;
            }

            let sameSign = (Math.sign(lastVibratoTime) == Math.sign(vibratoTime)); // Used for vibrato

            if (type === "vibrato" && stopbend && sameSign) {
                clearInterval(wave);
                time = 0;
                vibratoTime = 0;
                output.sendPitchBend(0, 1);
            }
            if ((type === "pitchup" || type === "pitchdown") && stopbend) {
                clearInterval(wave);
                time = 0;
                output.sendPitchBend(0, 1);
            }
        });
    }
}
