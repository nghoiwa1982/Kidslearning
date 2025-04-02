/* Styling for coloring section */
.color-btn {
  cursor: pointer;
  transition: all 0.15s ease;
}

.color-btn:hover {
  transform: scale(1.15);
}

.colorable {
  cursor: pointer;
  transition: all 0.2s ease;
}

.colorable:hover {
  filter: brightness(1.1);
}

/* Styling for matching game */
.fact, .answer {
  transition: all 0.2s ease;
}

.fact {
  cursor: grab;
  user-select: none;
}

.fact:active {
  cursor: grabbing;
}

.fact.opacity-50 {
  opacity: 0.5;
}
