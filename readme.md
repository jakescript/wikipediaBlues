# Wikipedia Blues

A google chrome extension aimed to bring joy to boring wikipedia pages. Transform the emotional value of the content into a quick tune.
_(working on adding to the chrome store)_

### About the project

Extract the current pages content and send it to the IBM Watson Tone Analyzer for emotional analysis. Depending on the values return for each sentence create a note with a corresponding frequency and wavelength. Using the Web Audio API - generate a song with each note and play it through the browser.

## Local Installation

```bash
git clone https://github.com/jakescript/wikipediaBlues
cd wikipediaBlues
npm i
npm run build
```

this will create a dist folder containing the webpacked version of the extension
from here navigate to [your extensions](chrome://extensions)
enable developer mode
Click _Load unpacked_ and navigate to the **/dist** folder

Enjoy the extension on any of your favorite wikipedia pages here are some I enjoy:
[The Grand Budapest Hotel
](https://en.wikipedia.org/wiki/The_Grand_Budapest_Hotel)
[TMNT](https://en.wikipedia.org/wiki/Teenage_Mutant_Ninja_Turtles)
[Milky Way Galaxy](https://en.wikipedia.org/wiki/Milky_Way)
[Scooby Doo](https://en.wikipedia.org/wiki/Scooby-Doo)

## Usage

Navigate to a wikipedia page
Wait until the extension turns green
Click and enjoy a generated song based on that page :)
