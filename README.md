# WebGPU/WGSL Hello Triangle!
An example of how to render a triangle with WebGPU using WebGPU Shading Language - the "Hello World!" of computer graphics.

## What it does?
**If your browser supports WebGPU and WGSL**, you should be able to see a gray square with a green triangle in the center. And that's it.

**Live example**: https://morzel85.github.io/webgpu-wgsl-hello-triangle/index.html 

## WebGPU and WGSL are work in progress!
Please mind that [WebGPU](https://gpuweb.github.io/gpuweb) and [WGSL](https://gpuweb.github.io/gpuweb/wgsl.html) specs are not finalized and implementations are changing! Visit [webgpu.io](https://webgpu.io) to check current status.

## Keep it simple!
WebGPU is a low-level API so its “Hello World!” can’t be a one-liner, nevertheless this repo is meant to be as simple as possible. Just two files: one for HTML and one for JavaScript - no Node.js, Weback etc.

Is it possible to simplify the code further? Teach me how! :)

## Test results (2021-03-25) ###
- Renders properly and without warnings in _Chrome Canary v91.0.4457.2 x64 Win 10_ with _--enable-unsafe-webgpu_ flag set.

## Credits
Code is based on https://github.com/austinEng/webgpu-samples
