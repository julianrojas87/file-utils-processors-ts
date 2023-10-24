import { Writer } from "@treecg/connector-types";
import path from "path";
import { memoryUsage } from "node:process";
import { access, readdir, readFile } from "fs/promises";
import { glob } from "glob";

export async function globRead(globPattern: string, writer: Writer<string>, wait: number = 0) {
    const jsfiles = await glob(globPattern, {});
    const files = await Promise.all(
        jsfiles.map((x) => readFile(x, { encoding: "utf8" })),
    );

    return async () => {
        for (let file of files) {
            await writer.push(file);
            await new Promise((res) => setTimeout(res, wait));
        }
    };
}

export async function readFolder(folder: string, writer: Writer<string>, maxMemory: number = 3) {
    const normalizedPath = path.normalize(folder);

    // Check folder exists
    await access(normalizedPath);

    // Read folder content and iterate over each file
    const fileNames = await readdir(normalizedPath, { recursive: true });
    console.log(`[PROCESSOR][readFolder] - Reading these files: ${fileNames}`);

    // This is needed to avoid that the initial stream gets consumed before the next processor is initialized.
    setTimeout(async () => {
        // TODO: Find a way to work in an on-demand mode for consuming streams.
        // Perhaps with AsyncIterators.
        for (const fileName of fileNames) {
            // Monitor process memory to avoid high-water memory crashes
            // Currently limited to 3Gb
            console.log(`[PROCESSOR][readFolder] - processing ${fileName}`);
            if (memoryUsage().heapUsed > maxMemory * 1024 * 1024 * 1024) {
                console.log(`[PROCESSOR][readFolder] - Phew! too much data (used ${Math.round((memoryUsage().heapUsed / 1024 / 1024) * 100) / 100} Mb)...waiting for 5s`);
                await sleep(5000);
            }

            await writer.push((await readFile(path.join(normalizedPath, fileName))).toString());
        }
    }, 5000);
}

function sleep(x: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, x));
}