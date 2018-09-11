export const getPersonneById = (tab, playerName) => {
	let i = 0
	let j = 0
	tab.forEach( function(element, index) {
		if (element.player.playerName.localeCompare(playerName) == 0)
			j = i
		i++
	});
	return j
}