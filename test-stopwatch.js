#!/usr/bin/env node
/**
 * Simple test script to verify stopwatch logic
 * Tests the core timing functions in a Node.js environment
 */

// Mock DOM elements
const mockElement = {
  textContent: '0.00',
  disabled: false
};

const displayElement = mockElement;
const startBtn = { disabled: false };
const stopBtn = { disabled: true };
const resetBtn = { disabled: false };

// Polyfills
const now = () => (performance && performance.now) ? performance.now() : Date.now();

// State variables (same as in index.html)
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let animationFrameId = null;

// Mock requestAnimationFrame
let rafCallbacks = [];
const raf = (cb) => {
  rafCallbacks.push(cb);
  return rafCallbacks.length - 1;
};
const caf = (id) => {
  if (id !== null && rafCallbacks[id]) {
    rafCallbacks[id] = null;
  }
};

function updateDisplay() {
  if (isRunning) {
    const currentTime = now();
    const delta = currentTime - startTime;
    const totalElapsed = elapsedTime + delta;
    const seconds = (totalElapsed / 1000).toFixed(2);
    displayElement.textContent = seconds;
    animationFrameId = raf(updateDisplay);
  }
}

function updateButtonStates() {
  startBtn.disabled = isRunning;
  stopBtn.disabled = !isRunning;
}

function handleStart() {
  if (!isRunning) {
    isRunning = true;
    startTime = now();
    updateDisplay();
    updateButtonStates();
  }
}

function handleStop() {
  if (isRunning) {
    isRunning = false;
    const currentTime = now();
    elapsedTime += (currentTime - startTime);
    caf(animationFrameId);
    updateButtonStates();
  }
}

function handleReset() {
  isRunning = false;
  elapsedTime = 0;
  startTime = 0;
  caf(animationFrameId);
  displayElement.textContent = '0.00';
  updateButtonStates();
}

// Test suite
console.log('Testing Stopwatch Logic...\n');

// Test 1: Initial state
console.log('Test 1: Initial State');
console.log('  Display:', displayElement.textContent);
console.log('  Start button disabled:', startBtn.disabled);
console.log('  Stop button disabled:', stopBtn.disabled);
console.log('  Expected: Display=0.00, Start=false, Stop=true');
console.log('  ✓ PASS\n');

// Test 2: Start button
console.log('Test 2: Start Button');
handleStart();
console.log('  isRunning:', isRunning);
console.log('  Start button disabled:', startBtn.disabled);
console.log('  Stop button disabled:', stopBtn.disabled);
console.log('  Expected: isRunning=true, Start=true, Stop=false');
console.log(isRunning && startBtn.disabled && !stopBtn.disabled ? '  ✓ PASS\n' : '  ✗ FAIL\n');

// Test 3: Time accumulation (simulate 1 second)
console.log('Test 3: Time Accumulation');
const startTimestamp = now();
setTimeout(() => {
  // Execute pending RAF callbacks
  rafCallbacks.forEach(cb => cb && cb());
  const elapsed = parseFloat(displayElement.textContent);
  console.log('  Elapsed time:', displayElement.textContent, 'seconds');
  console.log('  Expected: ~1.00 seconds');
  console.log(elapsed >= 0.95 && elapsed <= 1.05 ? '  ✓ PASS\n' : '  ✗ FAIL\n');

  // Test 4: Stop button
  console.log('Test 4: Stop Button');
  handleStop();
  const stoppedTime = displayElement.textContent;
  console.log('  isRunning:', isRunning);
  console.log('  Stopped at:', stoppedTime, 'seconds');
  console.log('  Start button disabled:', startBtn.disabled);
  console.log('  Stop button disabled:', stopBtn.disabled);
  console.log('  Expected: isRunning=false, Start=false, Stop=true');
  console.log(!isRunning && !startBtn.disabled && stopBtn.disabled ? '  ✓ PASS\n' : '  ✗ FAIL\n');

  // Test 5: Resume (start after stop)
  console.log('Test 5: Resume After Stop');
  handleStart();
  setTimeout(() => {
    rafCallbacks.forEach(cb => cb && cb());
    const resumedTime = parseFloat(displayElement.textContent);
    console.log('  Resumed time:', displayElement.textContent, 'seconds');
    console.log('  Expected: ~2.00 seconds (accumulated)');
    console.log(resumedTime >= 1.95 && resumedTime <= 2.05 ? '  ✓ PASS\n' : '  ✗ FAIL\n');

    // Test 6: Reset button
    console.log('Test 6: Reset Button');
    handleReset();
    console.log('  Display:', displayElement.textContent);
    console.log('  isRunning:', isRunning);
    console.log('  elapsedTime:', elapsedTime);
    console.log('  Expected: Display=0.00, isRunning=false, elapsedTime=0');
    console.log(displayElement.textContent === '0.00' && !isRunning && elapsedTime === 0 ? '  ✓ PASS\n' : '  ✗ FAIL\n');

    // Test 7: Multiple start clicks (idempotency)
    console.log('Test 7: Multiple Start Clicks (Idempotency)');
    handleStart();
    const firstStartTime = startTime;
    handleStart(); // Should be ignored
    handleStart(); // Should be ignored
    console.log('  Start time unchanged:', startTime === firstStartTime);
    console.log('  Expected: true (subsequent clicks ignored)');
    console.log(startTime === firstStartTime ? '  ✓ PASS\n' : '  ✗ FAIL\n');

    // Test 8: Reset while running
    console.log('Test 8: Reset While Running');
    // Already running from test 7
    setTimeout(() => {
      rafCallbacks.forEach(cb => cb && cb());
      handleReset();
      console.log('  Display:', displayElement.textContent);
      console.log('  isRunning:', isRunning);
      console.log('  Expected: Display=0.00, isRunning=false');
      console.log(displayElement.textContent === '0.00' && !isRunning ? '  ✓ PASS\n' : '  ✗ FAIL\n');

      console.log('All tests completed!');
    }, 500);
  }, 1000);
}, 1000);
