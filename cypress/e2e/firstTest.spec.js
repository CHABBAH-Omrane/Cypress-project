/// <reference types="cypress" />

// or context()
/*describe("First test suite", () => {
  describe("suite sectoin", () => {
    beforeEach("login", () => {
      //repeat for evry test
    });
    it("suite first test", () => {
      //put the code of the test
    });
  });

  it("first test", () => {
    //put the code of the test
  });

  it("second test", () => {
    //put the code of the test
  });

  it("third test", () => {
    //put the code of the test
  });
});

describe("second test suite", () => {
  it("first test", () => {
    //put the code of the test
  });

  it("second test", () => {
    //put the code of the test
  });

  it("third test", () => {
    //put the code of the test
  });
});
*/

describe("First test suite", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    //by tag name
    cy.get("input");

    //by ID
    cy.get("#inputEmail");

    //by Class value
    cy.get(".input-full-width");

    //by attribute name
    cy.get("[fullwidth]");

    //by attribute and value
    cy.get('[placeholder="Email"]');

    //by entire class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by two attributes
    cy.get('[placeholder="Email"][fullwidth]');

    // by TagContentType, attribute id and class
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

    /////by cypress test ID
    cy.get('[data-cy="imputEmail1" ]'); // important
  });

  it("find web elements 21", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //Theory
    //get() - find elements on the page by locator globally
    //find()  -find child elements by locator
    // contains() - find HTML test and by text and locator  //the first element

    cy.contains('[status="warning"]', "Sign in");
    //form  and after button
    cy.contains("nb-card", "Horizontal form").find("button");

    //cypress chains and DOM    //select o5rej lel parent and go to child
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });

  it("save subject of the command 22", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    const useTheGrid = cy.contains("nb-card", "Using the Grid");
    // cant do think like this
    //useTheGrid.find('[for="inputEmail1"]').should("contain", "Email");
    //useTheGrid.find('[for="inputPassword2"]').should("contain", "Password");

    //1 cypress alias @
    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");

    cy.get("@usingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    // 2 cypress then() method    //wrap()
    cy.contains("nb-card", "Using the Grid").then((usingTheGrid) => {
      cy.wrap(usingTheGrid)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.wrap(usingTheGrid)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");
    });
  });

  it("extract text value 23", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    //2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      cy.wrap(labelText).should("contain", "Email address");
    });

    //3
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .as("labelText")
      .should("contain", "Email address");

    //4     ???
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });

    //5 invoke property ::::: to check if the input is typed !
    cy.get("#exampleInputEmail1").type("test@test.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@test.com")
      .then((property) => {
        expect(property).to.equal("test@test.com");
      });
  });

  it("radio buttons 24", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(1).should("be.checked");
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("chechkbox buttons24", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').uncheck({ force: true });

    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(2).click({ force: true });
  });

  it("Date pickers1 25", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    let date = new Date();
    date.setDate(date.getDate() + 5);
    let futureDate = date.getDate(); //     let date = new Date();
    // date.setFullYear(date.getFullYear() - 8);
    // console.log(date);

    cy.contains(" nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get(".day-cell").not(".bounding-month").contains(futureDate).click();
        // cy.wrap(input).should("have.value", "Oct 21, 2023");
      });
  });

  it("Date pickers2 26", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
      let futureYear = date.getFullYear();
      let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          console.log("innnn");
          if (
            !dateAttribute.includes(futureMonth) ||
            !dateAttribute.includes(futureYear)
          ) {
            if (day >= 0) {
              cy.get('[data-name="chevron-right"]').click();
            } else {
              cy.get(
                "nb-calendar-pageable-navigation.ng-star-inserted > :nth-child(1)"
              ).click();
            }
            selectDayFromCurrent(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          }
        });
      return dateToAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        const dateToAssert = selectDayFromCurrent(-200);
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });

  it("lists and dropdowns 27", () => {
    cy.visit("/");

    //1
    cy.get("nb-select").click();
    // cy.get('[ng-reflect-value="dark"]').click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nb-select").should("contain", "Dark");

    //2
    cy.get("nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();
        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it("Web tables1 28", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1 get the row by text
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRows) => {
        const age = 35;

        cy.wrap(tableRows).find(".nb-edit").click();
        cy.wrap(tableRows)
          .find('[placeholder="Age"]')
          .click()
          .clear()
          .type(age);
        cy.wrap(tableRows).find(".nb-checkmark").click();
        cy.wrap(tableRows).find("td").eq(6).should("contain", age);
      });

    //2 get row by index
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Omrane");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Chabbah");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should("contain", "Omrane");
        cy.wrap(tableColumns).eq(3).should("contain", "Chabbah");
      });

    //3  Get each row validation
    const age = [20, 30, 200];
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(1000);
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it("Tooltips 30", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Colored Tooltips")
      .contains("Default")
      .trigger("mouseover")
      .click();
    cy.get("nb-tooltip")
      .should("be.visible")
      .and("contain", "This is a tooltip");
  });

  //??????????
  it("dilog box 30 ", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1
    cy.get("tbody tr").first().find(".nb-trash").click();
    cy.on("window:confirm", (confirm) => {
      expect(confirm).to.equal("Are you sure you want to delete?");
    });

    // //2
    // const stub = cy.stub();
    // cy.on("window:confirm", stub);
    // cy.get("tbody tr")
    //   .first()
    //   .find(".nb-trash")
    //   .click()
    //   .then(() => {
    //     expect(stub.getCall(0)).to.be.calledWith(
    //       "Are you sure you want to delete?"
    //     );
    //   });

    // //3
    // cy.get("tbody tr").first().find(".nb-trash").click();
    // cy.on("window:confirm", () => false);
  });

  it.only("Assertions 31", () => {
    //use Cypress documentation for more references
  });
});
