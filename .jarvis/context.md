# Jarvis Project Context

## Project Information

**Project Name**: Simple Stopwatch Web App
**Type**: Ad-hoc web application
**Created**: 2026-01-04

## Description

A minimal, single-page stopwatch web application built with vanilla HTML, CSS, and JavaScript. The app allows users to track elapsed time with start, stop, and reset functionality.

## Repository Structure

```
/
├── .jarvis/              # Jarvis configuration
│   └── context.md        # This file
├── docs/
│   └── design/
│       └── stopwatch-app.md   # Architecture and design documentation
└── index.html            # Main application (to be implemented)
```

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Build Tools**: None (single HTML file)
- **Dependencies**: None

## Design Documents

- **Main Design**: `docs/design/stopwatch-app.md`
  - Complete architecture and implementation plan
  - Component breakdown and data flow
  - Edge cases and testing strategy

## Development Guidelines

### Git Workflow

1. Work on main branch (simple project, no collaboration)
2. Commit frequently with descriptive messages
3. Push all changes to GitHub

### Coding Standards

- Use semantic HTML5 elements
- Follow CSS BEM naming convention (optional for this simple project)
- Use modern JavaScript (ES6+)
- Add comments for complex logic
- Format code consistently (2-space indentation)

## Key Design Decisions

1. **Single HTML File**: All code in one file for portability
2. **Vanilla JavaScript**: No frameworks or libraries
3. **High-Resolution Timing**: Use `performance.now()` for accuracy
4. **RequestAnimationFrame**: Smooth display updates synchronized with browser

## Next Steps

1. ✅ Architecture design complete
2. ⏳ Implement index.html with stopwatch functionality
3. ⏳ Test in multiple browsers
4. ⏳ Deploy (can be hosted anywhere as static HTML)

## Notes

- This is an ad-hoc project for demonstration purposes
- Design prioritizes simplicity and clarity over advanced features
- No backend or persistence required
