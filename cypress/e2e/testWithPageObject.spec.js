import { onDatePickerPage } from "../support/page-objects/datePickerPage";
import { onFormLayoutsPage } from "../support/page-objects/formLayoutsPage";
import { navigationTo } from "../support/page-objects/navigationPage";
import { onSmartTablePage } from "../support/page-objects/smartTablePage";

describe("Test with page object 32", () => {
  beforeEach("open applica", () => {
    cy.openHomePage();
  });
  it("verify navigation", () => {
    navigationTo.formLayoutPage();
    navigationTo.datePickerPage();
    navigationTo.smartTablePage();
    navigationTo.tooltipPage();
    navigationTo.toasterPage();
  });

  it.only("should submit inline form and basic form, select tomorrow date in the calendar .... ", () => {
    navigationTo.formLayoutPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail("omrane", "chabbah");
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
      "email",
      "new password"
    );

    navigationTo.datePickerPage();
    onDatePickerPage.selectCommonDatepickerDateFromToday(1);
    onDatePickerPage.selectDatepickerWithRangeFromToday(1, 12);

    navigationTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName("Omrane", "Bio");
    onSmartTablePage.deleteRowByIndex(3);
  });
});
