use tex_rsm_parser::parse_paragraphs_to_json;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;

#[wasm_bindgen]
pub fn parse_paragraphs(input: &str) -> JsValue {
    serde_wasm_bindgen::to_value(&parse_paragraphs_to_json(input)).unwrap()
}
