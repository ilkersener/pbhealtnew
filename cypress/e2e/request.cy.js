const domains = [
  {
    url: "https://demo.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "DO SUNUCUSUNU KONTROL EDİN!",
  },
  {
    url: "https://demo2.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "SH2 SUNUCUSUNU KONTROL EDİN!",
  },
  {
    url: "https://demo9.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "KNET SUNUCUSUNU KONTROL EDİN!",
  },
  {
    url: "https://corendon.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "CORENDON MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://ai.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "Aİ MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://ilab.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "ILAB MÜŞTERİSİNİ KONTROL EDİN !",
  },
  {
    url: "https://iga.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "İGA MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://orhanholding.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "ORHANHOLDİNG MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://teleperformance.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "TELEPERFORMANCE MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://shaya.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "SHAYA MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://erisim.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "ERİSİM MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://mavi.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "MAVİ MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://penti.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "PENTİ MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://nbs.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "NBS MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://viennalife.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "VİENNALİFE MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://eae.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "EAE MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://flypgs.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "FLYPGS MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://nobelilac.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "NOBELİLAC MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://marubeni.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "MARUBENİ MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://ozakglobal.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "OZAKGLOBAL MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://acikholding.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "ACİKHOLDİNG MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://sanovel.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "SANOVEL MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://viennalifeakademi.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "VİENNALİFEAKADEMİ MÜŞTERİSİNİ KONTROL EDİN!",
  },
  {
    url: "https://anex.peoplebox.biz/user/login",
    selector: "._main_1p1ww_22",
    errorMessage: "ANEX MÜŞTERİSİNİ KONTROL EDİN!",
  },
];

function checkDomain(domain, attempt = 1) {
  cy.request({
    url: domain.url,
    failOnStatusCode: false,
    timeout: 45000, //timeout ayarı
  }).then((response) => {
    if (response.status >= 400) {
      throw new Error(`HATA: ${domain.url} HTTP ${response.status} → ${domain.errorMessage}`);
    }

    cy.visit(domain.url, { timeout: 35000 });

    cy.get("body", { timeout: 35000 }).then(($body) => {
      if ($body.find(domain.selector).length === 0) {
        if (attempt < 2) {
          cy.log(`❗ ${domain.url} tekrar deneniyor...`);
          checkDomain(domain, attempt + 1);
        } else {
          throw new Error(`HATA: ${domain.url} → ${domain.errorMessage}`);
        }
      }
    });
  });
}

describe("Sunucu Sağlık Kontrolü", () => {
  domains.forEach((domain) => {
    it(`Kontrol ediliyor: ${domain.url}`, () => {
      checkDomain(domain);
    });
  });

  afterEach(function () {
    if (this.currentTest.state === "failed") {
      const fileName = this.currentTest.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      cy.screenshot(`failures/${fileName}`, { capture: "runner" });
    }
  });
});
