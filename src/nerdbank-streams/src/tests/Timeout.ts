import { Deferred } from '../Deferred'

export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
	const deferred = new Deferred<T>()
	const timer = setTimeout(() => {
		deferred.reject('timeout expired')
	}, ms)
	promise.then(result => {
		clearTimeout(timer)
		deferred.resolve(result)
	})
	promise.catch(reason => {
		clearTimeout(timer)
		deferred.reject(reason)
	})
	return deferred.promise
}

export function delay(ms: number): Promise<void> {
	const deferred = new Deferred<void>()
	setTimeout(() => {
		deferred.resolve()
	}, ms)
	return deferred.promise
}

export function nextTick(): Promise<void> {
	const deferred = new Deferred<void>()
	process.nextTick(deferred.resolve.bind(deferred))
	return deferred.promise
}
