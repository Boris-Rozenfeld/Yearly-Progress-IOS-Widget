/**
 * Scriptable Widget: Remaining Hours in 2025 with Progress Bar
 */

// Get current date and time
let now = new Date();

// Set target dates for 2025
let startOfYear = new Date('2025-01-01T00:00:00');
let endOfYear = new Date('2025-12-31T23:59:59');

// Calculate remaining hours until the end of 2025
let difference = endOfYear - now;
let remainingHours = Math.floor(difference / (1000 * 60 * 60));

// Calculate year progress (elapsed / total)
let totalTime = endOfYear - startOfYear;
let elapsedTime = now - startOfYear;
if (elapsedTime < 0) {
  elapsedTime = 0;
} else if (elapsedTime > totalTime) {
  elapsedTime = totalTime;
}
let progress = elapsedTime / totalTime;
let progressPercent = Math.floor(progress * 100);

// Create a progress bar image
let progressBarWidth = 150;
let progressBarHeight = 10;
let ctx = new DrawContext();
ctx.size = new Size(progressBarWidth, progressBarHeight);
ctx.opaque = false;
ctx.respectScreenScale = true;

// Draw progress bar background (light gray)
ctx.setFillColor(new Color("#d3d3d3"));
ctx.fillRect(new Rect(0, 0, progressBarWidth, progressBarHeight));

// Draw filled portion representing progress (iOS blue)
ctx.setFillColor(new Color("#007aff"));
ctx.fillRect(new Rect(0, 0, progressBarWidth * progress, progressBarHeight));

let progressBarImage = ctx.getImage();

// Create the widget
let widget = new ListWidget();
widget.addSpacer(8);

// Title
let title = widget.addText("Hours Left");
title.font = Font.boldSystemFont(14);
title.centerAlignText();
widget.addSpacer(5);

// Display the remaining hours (large focus)
let hoursText = widget.addText(`${remainingHours}`);
hoursText.font = Font.systemFont(38);
hoursText.centerAlignText();
widget.addSpacer(5);

// Add progress bar image to widget
let progressImage = widget.addImage(progressBarImage);
progressImage.centerAlignImage();
widget.addSpacer(2);

// Display progress percentage text
let percentText = widget.addText(`${progressPercent}% of 2025 completed`);
percentText.font = Font.systemFont(10);
percentText.textColor = Color.gray();
percentText.centerAlignText();
widget.addSpacer(5);


// Refresh the widget every minute
widget.refreshAfterDate = new Date(Date.now() + 1000 * 60);

// Present the widget (for testing)
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentSmall();
}
Script.complete();
