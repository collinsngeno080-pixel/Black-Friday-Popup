# FileLabelPro pricing page with the Black Friday pop-up

This is a rebuild of https://filelabelpro.collegeproduce.com/pricing with a Black Friday pop-up over a blurred background. There is no bar above the navigation.

**To view it:** open `index.html` in a browser. The pop-up appears after 3 seconds.

## Files

- `index.html`: the pricing page with the pop-up
- `popup-snippet.html`: just the pop-up markup, ready to paste before `</body>` on the live site
- `popup.css` and `popup.js`: the pop-up's styles and behavior
- `styles.css` and `script.js`: the pricing page itself, including the Monthly/Annual price switch
- `assets/file-label-pro.png`: the logo

## How the pop-up behaves

- **When it opens:** 3 seconds after the page loads.
- **How often:** on the live site, once per visitor. When you open the file from your own computer, it shows every time so you can preview it.
- **Closing:** the X, "Not now", the Esc key, or a click on the blurred background.
- **Background:** the page behind is blurred and dimmed, and can't be scrolled while the pop-up is open.
- **Phones:** under 640px wide, it slides up from the bottom of the screen.
- **When the offer ends:** after `data-ends="2026-11-30T23:59:59-05:00"` (11:59 pm Eastern Time, Monday November 30), it never opens.
- **Testing on the live site:** add `?bfpopup=1` to the page address to make it show every time.
- **Settings:** the delay and the "seen" key are at the top of `popup.js`.

## Adding it to the live site (Next.js)

Add these three things to the live site:

1. The block from `popup-snippet.html`
2. `popup.css`
3. `popup.js`

## Links

- **Button:** "Try FileLabelPro" goes to `https://filelabelpro.collegeproduce.com/try`
- **Terms:** "See terms" goes to `https://collegeproduce.com/file-labelpro/terms`. Point it at offer-specific terms if you have them.
