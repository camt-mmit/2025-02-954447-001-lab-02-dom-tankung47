/**
 * Create section-lists component.
 *
 * @param {HTMLElement} componentElem
 *
 * @returns {HTMLElement}
 */
export function createComponent(componentElem) {
  const templateElem = componentElem.querySelector(".app-tmp-section");

  if (templateElem === null) {
    throw new Error("Template .app-tmp-section is not found");
  }

  const sectionListContainer = templateElem.parentElement;

  if (sectionListContainer === null) {
    throw new Error("Template .app-tmp-section does not have parent");
  }

  // ------------------------------------------------------------
  // Auto-number + Disable remove button when only 1 left
  // ------------------------------------------------------------
  const regenerateSectionNumbersAndStatus = () => {
    const sectionItems = [
      ...sectionListContainer.querySelectorAll(".app-cmp-section"),
    ];

    sectionItems.forEach((sectionElem, index) => {
      // number
      [...sectionElem.querySelectorAll(".app-title-section-number")].forEach(
        (elem) => (elem.textContent = `${index + 1}`)
      );

      // disable remove button
      [...sectionElem.querySelectorAll(".app-cmd-remove-section")].forEach(
        (btn) => (btn.disabled = sectionItems.length === 1)
      );
    });
  };

  // ------------------------------------------------------------
  // Create one section component
  // ------------------------------------------------------------
  const createSectionComponent = () => {
    const sectionElem = templateElem.content.cloneNode(true).firstElementChild;

    // handle remove section
    sectionElem.addEventListener("click", (ev) => {
      if (ev.target?.matches(".app-cmd-remove-section") ?? false) {
        sectionElem.remove();
        regenerateSectionNumbersAndStatus();
      }
    });

    sectionListContainer.append(sectionElem);

    regenerateSectionNumbersAndStatus();

    return sectionElem;
  };

  // ------------------------------------------------------------
  // Add section button
  // ------------------------------------------------------------
  componentElem.addEventListener("click", (ev) => {
    if (ev.target?.matches(".app-cmd-add-section")) {
      createSectionComponent();
    }
  });

  // ------------------------------------------------------------
  // Create first default section
  // ------------------------------------------------------------
  createSectionComponent();

  return componentElem;
}
