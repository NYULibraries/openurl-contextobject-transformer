var o2x = require('object-to-xml');


let data = "?&ctx_ver=Z39.88-2004&ctx_enc=info:ofi/enc:UTF-8&ctx_tim=2017-10-27T12%3A42%3A36IST&url_ver=Z39.88-2004&url_ctx_fmt=infofi/fmt:kev:mtx:ctx&rfr_id=info:sid/primo.exlibrisgroup.com:primo-dedupmrg431081457&rft_val_fmt=info:ofi/fmt:kev:mtx:journal&rft.genre=journal&rft.jtitle=The%20New%20Yorker.&rft_id=info:doi/&rft.object_id=110975413975944&rft.eisbn=&rft_dat=<NSMARCIT>110975413975944</NSMARCIT>&rft_id=info:oai/&sfx.ignore_date_threshold=1"

function has_equal_sign(element){
  return element.includes("=");
};
function split_by_equal_sign(element){
  return element.split('=',2);
};
function pair_has_second_element(pair){
  return pair[1];
};
function pair_to_key_value(obj, pair){
  obj[pair[0]] = pair[1];
  return obj;
};
function pair_key_transformation(pair){
  let key_mappings = {
    "rft.genre" : "rft:genre",
    "rft.object_id" : "rft:object_id",
    "rft_dat" : "rft:private_data"
  };
  pair[0] = key_mappings[pair[0]];
  return pair;
};
function has_nil_key(pair){
  return pair[0];
};



let xmlify = data.split('&')
                 .filter(has_equal_sign)
                 .map(split_by_equal_sign)
                 .filter(pair_has_second_element)
                 .map(pair_key_transformation)
                 .filter(has_nil_key)
                 .reduce(pair_to_key_value, {});
let obj = {
  '?xml version=\"1.0\" encoding=\"UTF-8\"?' : null,
  "ctx:context-objects" : {
    '@' : {
      "xmlns:ctx" : 'info:ofi/fmt:xml:xsd:ctx',
      "xsi:schemaLocation" : "info:ofi/fmt:xml:xsd:ctx http://www.openurl.info/registry/docs/info:ofi/fmt:xml:xsd:ctx",
      "xmlns:xsi" : "http://www.w3.org/2001/XMLSchema-instance"
    },
    '#' : {
      "ctx:context-object" : {
        '@' : {
            "identifier" : '',
            "timestamp" : (new Date()).toISOString(), // I think this should work
            "version" : 'Z39.88-2004'
          },
        '#' : {
            "ctx:referent" : {
              '#' : {
                "ctx:metadata-by-val" : {
                  '#' : {
                    "ctx:format" : "",
                    "ctx:metadata" : xmlify
                  }
                }
              }
            }
          }
        }
      }
    }
  };

console.log(o2x(obj));
