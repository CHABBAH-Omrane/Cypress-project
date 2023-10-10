function selectGroupMenuForm(groupName) {
  cy.contains("a", groupName).then((menu) => {
    cy.wrap(menu)
      .find(".expand-state g g")
      .invoke("attr", "data-name")
      .then((attr) => {
        //tag a contains groupName(Form,Layout ...) >find tag (expand)>tag g < tag g  , invoke : dans cette tag attr sont name est date...
        if (attr.includes("left")) {
          cy.wrap(menu).click();
          // then the last name if includes world left , go to click in menu ( <a )
        }
      });
  });
}

function closeGroupMenu(groupName) {
  cy.contains("a", groupName).then((menu) => {
    cy.wrap(menu)
      .find(".expand-state g g")
      .invoke("attr", "data-name")
      .then((attr) => {
        //tag a contains groupName(Form,Layout ...) >find tag (expand)>tag g < tag g  , invoke : dans cette tag attr sont name est date...
        if (attr.includes("down")) {
          cy.wrap(menu).click();
          // then the last name if includes world left , go to click in menu ( a )
        }
      });
  });
}
export class NavigationPage {
  formLayoutPage() {
    selectGroupMenuForm("Form");
    cy.contains("Form Layouts").click();

    closeGroupMenu("Form");
  }

  formModal() {
    selectGroupMenuForm("Modal & Overlays");
    cy.contains("Toastr").click();
    closeGroupMenu("Modal & Overlays");
  }
  datePickerPage() {
    selectGroupMenuForm("Form");
    cy.contains("Datepicker").click();
    closeGroupMenu("Form");
  }

  smartTablePage() {
    selectGroupMenuForm("Tables & Data");
    cy.contains("Smart Table").click();
    closeGroupMenu("Tables & Data");
  }
  tooltipPage() {
    selectGroupMenuForm("Modal & Overlays");
    cy.contains("Tooltip").click();
    closeGroupMenu("Modal & Overlays");
  }

  toasterPage() {
    selectGroupMenuForm("Modal & Overlays");
    cy.contains("Toastr").click();
    closeGroupMenu("Modal & Overlays");
  }
}

export const navigationTo = new NavigationPage();
