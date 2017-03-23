export const randInRange = function(min,max) {
	return min + Math.random() * (max - min)
}

export const getRandomTransforms = function() {
	var transform = ''
	transform += `scale(${randInRange(.85,1.15)},${randInRange(.85,1.15)}) ` 
	transform += `skew(${randInRange(-2,2)}deg,${randInRange(-2,2)}deg) `
	transform += `translate(${randInRange(-10,10)}px,${randInRange(-10,10)}px)`
    return transform
}