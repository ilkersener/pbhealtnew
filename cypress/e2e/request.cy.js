const { exec } = require("child_process");

describe("Domain Content Check", () => {
  const domains = [
    {
      url: "https://demo.peoplebox.biz/user/login",
      selector: "._main_1p1ww_22",
      errorMessage: "🚨 DO SUNUCUSU PATLADI!",
    },
    {
      url: "https://demo2.peoplebox.biz/user/login",
      selector: ".testeestest",
      errorMessage: "🚨 SH2 SUNUCUSU PATLADI!",
    },
    {
      url: "https://demo9.peoplebox.biz/user/login",
      selector: "._main_1p1ww_22",
      errorMessage: "🚨 KNET SUNUCUSU PATLADI!",
    },
  ];

  let failedDomains = [];

  domains.forEach((domain) => {
    it(`Checking ${domain.url}`, () => {
      // Sayfa HTTP hatası veriyor mu kontrol et
      cy.request({
        url: domain.url,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status >= 400) {
          cy.log(`🚨 ${domain.url} açılırken hata aldı: ${response.status}`);
          failedDomains.push(`🌐 ${domain.url} → HTTP ERROR ${response.status}`);
          throw new Error(`🚨 ${domain.url} açılırken hata aldı: ${response.status}`);
        }
      });

      // Sayfaya git
      cy.visit(domain.url, { failOnStatusCode: false });
      cy.wait(3000);

      // Selector'un olup olmadığını test et
      cy.get("body").then(($body) => {
        if ($body.find(domain.selector).length === 0) {
          cy.log(domain.errorMessage);
          failedDomains.push(`🌐 ${domain.url} → ${domain.errorMessage}`);
          throw new Error(`🚨 HATA: ${domain.url} → ${domain.errorMessage}`);
        } else {
          cy.log(`✅ ${domain.url} is OK!`);
        }
      });
    });
  });

  after(() => {
    if (failedDomains.length > 0) {
      console.log("🔥 HATALI DOMAINLER:");
      failedDomains.forEach((msg) => console.log(msg));

      const errorMessage = `⚠️ *Domain Hataları Tespit Edildi!* \n${failedDomains.join(
        "\n"
      )}`;
      cy.log(errorMessage);

      // Cypress’in hataları yakalaması için bir error fırlat
      throw new Error(errorMessage);
    }
  });
});
