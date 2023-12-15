const controls = {
    PlayerOneAttack: 'KeyA',
    PlayerOneBlock: 'KeyD',
    PlayerTwoAttack: 'KeyJ',
    PlayerTwoBlock: 'KeyL',
    PlayerOneCriticalHitCombination: ['KeyQ', 'KeyW', 'KeyE'],
    PlayerTwoCriticalHitCombination: ['KeyU', 'KeyI', 'KeyO']
};

this.fight().then(winner => {
    this.showWinnerModal(winner);
});

export default controls;
