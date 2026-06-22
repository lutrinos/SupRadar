import csv from "csv-parser";
import { createReadStream } from "node:fs";
import { Value } from "@sinclair/typebox/value";
import log from "./log";
import { BuildSchema } from "drizzle-typebox";

export const d = <T>(v: T | undefined, r: T) => v ?? r;
export const ds = (v: string, r: string) => v.length > 0 ? v : r;

// Pour transformer du texte en slug
export function slugify(str: string) {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]|^[^a-zA-Z0-9éèàç]+|[^a-zA-Z0-9éèàç]+$/g, '')
        .replace(/[^a-zA-Z0-9éèàç]+/g, '-');
}

// Pour parser du csv
export async function parseCSV(year: number, callback: (data: any, year: number) => void) {
    return new Promise((resolve) => {
        createReadStream(`./data/source/fr-esr-parcoursup_${year}.csv`)
            .pipe(csv({
                separator: ';',
            }))
            .on('data', (c) => {
                callback(c, year);
            })
            .on('end', () => {
                resolve(undefined);
            });
    });
}

// Pour réaliser des chunks
export async function chunk<T>(arr: T[], chunkSize: number, callback: (c: T[]) => void) {
    const promises = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
        promises.push(callback(arr.slice(i, Math.min(i + chunkSize, arr.length))));
    }

    await Promise.all(promises);
}

// Pour stocker les valeurs intermédiaires
export class Intermediary<T> {
    primary: string;
    schema: BuildSchema<any, any, any>;
    data: Map<string, T>

    constructor(primary: any, schema: BuildSchema<any, any, any>) {
        this.primary = primary;
        this.schema = schema;
        this.data = new Map();
    }

    add(data: T) {
        if (!Value.Check(this.schema, data)) {
            console.log(Array.from(Value.Errors(this.schema, [], data)));
            return log('error', 'Wrong data', data);
        }

        this.data.set(data[this.primary], data);
    }

    get(key: any) {
        return this.data.get(key);
    }

    size() {
        return this.data.size;
    }

    findFirst(fn: (item: T) => boolean) {
        for (const v of this.data.values()) {
            if (fn(v)) return v;
        }
        return;
    }

    async save(path: string, key: any) {
        const obj = {};

        this.data.forEach((value) => {
            // @ts-expect-error
            obj[value[key]] = value;
        });

        // @ts-ignore
        await Bun.write(path, JSON.stringify(obj));
    }

    code(key: any, codeKey: string) {
        if (key && this.data.has(key)) {
            // @ts-expect-error
            return this.data.get(key)[codeKey];
        }
        return this.data.size;
    }

    async chunk(chunkSize: number, fn: (v: T[]) => void) {
        const promises = [];
        const arr = Array.from(this.data.values());

        for (let i = 0; i < arr.length; i += chunkSize) {
            promises.push(fn(arr.slice(i, Math.min(i + chunkSize, arr.length))));
        }

        await Promise.all(promises);
    }
}