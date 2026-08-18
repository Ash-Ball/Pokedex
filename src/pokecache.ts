
export type CacheEntry<T> = {
    createdAt: number;
    val: T
}


export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapInterfalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval:number) {
    this.#interval = interval
    this.#startReapLoop()
  }

  add<T>(key:string, val:T): void {
    this.#cache.set(key, {createdAt: Date.now(), val: val})
  };

  get<T>(key:string): CacheEntry<any> | undefined {
    return this.#cache.get(key)
  };

  has<T>(key:string):boolean {
    return this.#cache.has(key)
  }

  #reap() {
    for (let [key, value] of this.#cache.entries()){
        if(value.createdAt <= Date.now() - this.#interval){
            this.#cache.delete(key)
        }
    }
  }
  #startReapLoop(){
    this.#reapInterfalId = setInterval(() => {
    this.#reap();
    }, this.#interval);
}

  stopReapLoop(){
    clearInterval(this.#reapInterfalId)
  }
}