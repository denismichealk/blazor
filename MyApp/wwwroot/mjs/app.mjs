import { $1, $$ } from "@servicestack/client"
export function mountAll(opt) {
    $$('[data-module]').forEach(async el => {
        let modulePath = el.getAttribute('data-module')
        if (!modulePath) return
        if (!modulePath.startsWith('/') && !modulePath.startsWith('.')) {
            modulePath = `../${modulePath}`
        }
        try {
            console.log('loading ', modulePath)
            const module = await import(modulePath)
            if (typeof module.default?.load == 'function') {
                module.default.load()
            }
        } catch (e) {
            console.error(`Couldn't load module ${el.getAttribute('data-module')}`, e)
        }
    })
}

export async function remount() {
    mountAll({ force: true })
}

document.addEventListener('DOMContentLoaded', () =>
    Blazor.addEventListener('enhancedload', () => {
        remount()
        globalThis.hljs?.highlightAll()
    }))
