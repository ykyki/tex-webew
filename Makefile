.PHONY: wasm
wasm:
	wasm-pack build --release --target bundler -d ${PWD}/webfront3/resources/gen/wasm_rs ${PWD}/wasm_rs