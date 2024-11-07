
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/polyfills.CG3oGVWg.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/app.CLuo79Pr.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/OnePage.Cavi2GRx.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/DeliveryMethodSelectorSection.CbT01DxV.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/useUnauthenticatedErrorModal.mF_qYfej.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/LegacyVaultedShippingMethods.YC0KkLwL.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/Rollup.B0bOJ_op.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/SubscriptionPriceBreakdown.CSNL_kMU.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/MarketsProDisclaimer.CkkpHRub.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/ShopPayLogo.4dyVCuol.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/index.BORpGJNy.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/PickupPointCarrierLogo.BucfLkMI.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/hooks.C1kKMdf9.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/VaultedPayment.qZ1kFOmf.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/useShowShopPayOptin.DzWHw_qU.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/useShopPayRequiresVerification.BI-Qn-YC.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/Section.DIOTMEum.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/useGooglePaySdk.BmwhePRg.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/ShopPayLoginLoader.B1BjkFbM.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/publishMessage.1urzEOzD.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/PayButtonSection.DVF7Rh1O.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/RageClickCapture.BdtOkPH2.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/context.DpE3xfan.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/DutyOptions.CvT_GL9Z.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/useAmazonContact.DsujvyB9.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/StockProblemsLineItemList.Cfo7rYXx.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/component-ShopPayVerificationSwitch.BME-A24a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/index.MMwZnnyv.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/app.CwZNG6Hb.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/OnePage.BsDM6oHQ.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/DeliveryMethodSelectorSection.DNerkzQV.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/Rollup.o9Mx-fKL.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/SubscriptionPriceBreakdown.Bqs0s4oM.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/ShopPayLogo.D_HPU8Dh.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/PickupPointCarrierLogo.C0wRU6wV.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/VaultedPayment.BO3829nT.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/Section.kUTT-9EZ.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/ShopPayLoginLoader.CjGSo8kt.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/PayButtonSection.DF7trkKf.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/RageClickCapture.DnkQ4tsk.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/DutyOptions.Bd1Z60K2.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/useAmazonContact.D-Ox6Dnf.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/StockProblemsLineItemList.CxdIQKjw.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.es/assets/ShopPayVerificationSwitch.DVQdwG9J.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0595/0403/3941/files/logo-PLanet-2021_2_8c166806-d316-4238-aff3-a6414ea7b217_x320.png?v=1634136856"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  