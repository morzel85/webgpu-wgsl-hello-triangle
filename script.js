(async () => {
    if (!navigator.gpu) {
        alert('Your browser does not support WebGPU or it is not enabled. More info: https://webgpu.io');
        return;
    }

    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('gpupresent');

    const swapChainFormat = 'bgra8unorm';

    const swapChain = context.configureSwapChain({
        device,
        format: swapChainFormat
    });

    const vertexShaderWgslCode =
        `
        const pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
        vec2<f32>(0.0, 0.5),
        vec2<f32>(-0.5, -0.5),
        vec2<f32>(0.5, -0.5));
      
        [[builtin(position)]] var<out> Position : vec4<f32>;
        [[builtin(vertex_idx)]] var<in> VertexIndex : i32;
      
        [[stage(vertex)]]
        fn main() -> void {
            Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
            return;
        }
    `;

    const fragmentShaderWgslCode =
        `
        [[location(0)]] var<out> outColor : vec4<f32>;
      
        [[stage(fragment)]]
        fn main() -> void {
            outColor = vec4<f32>(0.0, 1.0, 0.0, 1.0);
            return;
        }
    `;

    const pipeline = device.createRenderPipeline({
        vertex: {
            module: device.createShaderModule({
                code: vertexShaderWgslCode
            }),
            entryPoint: 'main'
        },
        fragment: {
            module: device.createShaderModule({
                code: fragmentShaderWgslCode
            }),
            entryPoint: 'main',
            targets: [{
                format: swapChainFormat,
            }]
        },
        primitive: {
            topology: 'triangle-list',
        }
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = swapChain.getCurrentTexture().createView();

    const renderPassDescriptor = {
        colorAttachments: [{
            attachment: textureView,
            loadValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },
        }]
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.draw(3, 1, 0, 0);
    passEncoder.endPass();

    device.queue.submit([commandEncoder.finish()]);
})();
