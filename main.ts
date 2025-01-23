namespace SpriteKind {
    export const MeanGuy = SpriteKind.create()
    export const box = SpriteKind.create()
    export const Dooor1 = SpriteKind.create()
    export const Point = SpriteKind.create()
    export const InventoryMenu = SpriteKind.create()
    export const Title = SpriteKind.create()
    export const Annoying = SpriteKind.create()
    export const Text = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(titleScreen)) {
        if (!(inventory)) {
            if (inDialouge) {
                fancyText.cancelAnimation(dialouge)
            } else {
                Movement(false)
                inventory = true
                Menu = sprites.create(assets.image`Menu`, SpriteKind.InventoryMenu)
                Menu.setPosition(35, 50)
                Menu.setFlag(SpriteFlag.RelativeToCamera, true)
            }
        } else {
            Movement(true)
            inventory = false
            sprites.destroy(Menu)
        }
    }
})
function CreatePlayer () {
    // Create the hitbox and make it invisible
    hitbox = sprites.create(assets.image`Hitbox`, SpriteKind.box)
    // Invisible hitbox
    hitbox.setFlag(SpriteFlag.Invisible, true)
    // Create the player sprite (Frisk) and set up animations
    frisk = sprites.create(assets.image`Frisk`, SpriteKind.Player)
    frisk.z = 10
    // Frisk won't affect collisions
    frisk.setFlag(SpriteFlag.GhostThroughWalls, true)
    // Move the hitbox with the controller
    controller.moveSprite(hitbox, 80, 80)
    // Camera follows the hitbox (not Frisk)
    scene.cameraFollowSprite(hitbox)
    tiles.placeOnRandomTile(hitbox, assets.tile`tile176`)
    characterAnimations.loopFrames(
    frisk,
    assets.animation`myAnim4`,
    200,
    characterAnimations.rule(Predicate.FacingDown, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    frisk,
    assets.animation`myAnim1`,
    150,
    characterAnimations.rule(Predicate.MovingDown)
    )
    characterAnimations.loopFrames(
    frisk,
    assets.animation`myAnim2`,
    150,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    frisk,
    assets.animation`myAnim7`,
    150,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    frisk,
    assets.animation`myAnim0`,
    150,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    frisk,
    assets.animation`myAnim5`,
    200,
    characterAnimations.rule(Predicate.FacingUp, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    frisk,
    assets.animation`myAnim6`,
    150,
    characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
    )
    characterAnimations.loopFrames(
    frisk,
    assets.animation`myAnim3`,
    150,
    characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
    )
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(titleScreen)) {
        if (!(inventory)) {
            if (spriteutils.distanceBetween(hitbox, save) < 20) {
                GameSaved()
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
            } else if (inDialouge) {
                cofirmTextChange = fancyText.remainingAnimationTime(dialouge) == 0
            }
        } else {
            Movement(true)
            inventory = false
            sprites.destroy(Menu)
        }
    }
})
function GameSaved () {
    blockSettings.writeBoolean("SaveFile?", true)
    blockSettings.writeNumber("Seconds", playTimeSeconds)
    blockSettings.writeNumber("Minutes", playTimeMinutes)
    console.logValue("GameSaved?", true)
}
scene.onHitWall(SpriteKind.box, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Top)) {
        if (sprite.tileKindAt(TileDirection.Top, assets.tile`tile0`) || sprite.tileKindAt(TileDirection.Top, assets.tile`tile104`)) {
            LoadTileMap(2, 1)
        } else if (hitbox.tileKindAt(TileDirection.Top, assets.tile`tile220`)) {
            if (controller.A.isPressed()) {
                hitbox.setVelocity(0, 0)
                tiles.setTileAt(location, assets.tile`tile237`)
                tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`tile235`)
            }
        }
    }
})
function Instructions () {
    music.play(music.createSong(assets.song`Start Menu`), music.PlaybackMode.LoopingInBackground)
    myTextSprite = fancyText.create("---Instruction---", 0, 2, customFont.Determination)
    myTextSprite.y += -75
    myTextSprite2 = fancyText.create("[Z or A] - Confirm", 0, 2, customFont.Determination)
    myTextSprite2.y += -44
    myTextSprite2.x += -5
    myTextSprite5 = fancyText.create("[X or B] - Cancel", 0, 2, customFont.Determination)
    myTextSprite5.y = myTextSprite2.y + 15
    myTextSprite5.x = myTextSprite2.x - 4
    myTextSprite3 = fancyText.create("[MENU] - Menu (In-game)", 0, 2, customFont.Determination)
    myTextSprite3.y = myTextSprite5.y + 15
    myTextSprite3.x = myTextSprite5.x + 20
    myTextSprite4 = fancyText.create("[KIOSK] - Fullscreen", 0, 2, customFont.Determination)
    myTextSprite4.y = myTextSprite3.y + 15
    myTextSprite4.x = myTextSprite3.x - 9
    myTextSprite6 = fancyText.create("When HP is 0, you lose.", 0, 2, customFont.Determination)
    myTextSprite6.y = myTextSprite4.y + 15
    myTextSprite6.x = myTextSprite4.x + 9
    myTextSprite8 = fancyText.create("Begin Game", 0, 5, customFont.Determination)
    myTextSprite8.y = myTextSprite6.y + 30
    myTextSprite8.x = myTextSprite6.x - 40
    myTextSprite7 = fancyText.create("Undertale V0.1.1 \"(c)\" Sonicblaston 2024-2025", 0, 11, customFont.Crypt_of_Next_Week)
    myTextSprite7.y = 184
    pause(500)
    pauseUntil(() => controller.A.isPressed())
    music.stopAllSounds()
}
scene.onOverlapTile(SpriteKind.box, assets.tile`tile227`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`tile231`)
    music.play(music.createSoundEffect(WaveShape.Noise, 5000, 3279, 255, 255, 50, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
function Movement (Move: boolean) {
    if (Move == true) {
        controller.moveSprite(hitbox, 80, 80)
    } else if (Move == false) {
        controller.moveSprite(hitbox, 0, 0)
    }
}
function startFight () {
	
}
scene.onOverlapTile(SpriteKind.box, assets.tile`tile224`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`tile233`)
    music.play(music.createSoundEffect(WaveShape.Noise, 5000, 3279, 255, 255, 50, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
function GameStart () {
    if (funValue != 1) {
        Logo = sprites.create(assets.image`Undertale`, SpriteKind.Title)
        StartGameText = "[PRESS A OR Z]"
        scaling.scaleToPercent(Logo, 200, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        Logo.y += -10
    } else {
        Logo = sprites.create(assets.image`Deltarune LOL`, SpriteKind.Title)
        dog = sprites.create(assets.image`Dog`, SpriteKind.Annoying)
        animation.runImageAnimation(
        dog,
        assets.animation`Sleep`,
        750,
        true
        )
        dog.y += 80
        StartGameText = "[OOPS WRONG GAME!]"
        Logo.y += -20
        scaling.scaleToPercent(Logo, 200, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    }
    Logo2 = fancyText.create("ARCADE", 0, 0, customFont.Determination)
    Logo2.y += 6
    music.play(music.createSoundEffect(WaveShape.Noise, 650, 650, 255, 0, 2500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    pause(4000)
    Logo3 = fancyText.create(StartGameText, 0, 11, customFont.Crypt_of_Next_Week)
    Logo3.y += 48
    pauseUntil(() => controller.A.isPressed())
    if (blockSettings.readBoolean("HasPlayed") == false) {
        sprites.destroy(dog)
        sprites.destroy(Logo)
        sprites.destroy(Logo2)
        sprites.destroy(Logo3)
        Instructions()
    }
    blockSettings.writeBoolean("HasPlayed", true)
    color.startFadeFromCurrent(color.White, 2500)
    soundeffect = soundEffects.createSound(soundEffects.waveNumber(WaveType.Cycle64), 2500, 100, 2500, 100, 255)
    soundeffect.play()
    pause(3500)
    sprites.destroy(dog)
    sprites.destroy(Logo)
    sprites.destroy(Logo2)
    sprites.destroy(Logo3)
    sprites.destroy(myTextSprite)
    sprites.destroy(myTextSprite2)
    sprites.destroy(myTextSprite3)
    sprites.destroy(myTextSprite4)
    sprites.destroy(myTextSprite5)
    sprites.destroy(myTextSprite6)
    sprites.destroy(myTextSprite7)
    sprites.destroy(myTextSprite8)
    CreatePlayer()
    LoadTileMap(1, 1)
    pause(500)
    color.setPalette(
    color.originalPalette
    )
    color.startFadeFromCurrent(color.originalPalette, 10)
    inventory = false
    music.play(music.createSong(assets.song`Ruins0`), music.PlaybackMode.LoopingInBackground)
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    playDialouge(assets.image`myImage2`, "How are you doing my child? You're doing very well.", false, true, true)
})
function LoadTileMap (Map: number, EntranceDoor: number) {
    if (Map == 1) {
        tiles.setCurrentTilemap(tilemap`Ruins1`)
        save = sprites.create(assets.image`SavePoint`, SpriteKind.Point)
        save.y += 50
        animation.runImageAnimation(
        save,
        assets.animation`myAnim`,
        180,
        true
        )
        hitbox.setPosition(save.x, save.y - -8)
    } else if (Map == 2) {
        Movement(false)
        color.startFadeFromCurrent(color.Black, 500)
        timer.after(750, function () {
            sprites.destroy(save)
            tiles.setCurrentTilemap(tilemap`Ruins2`)
            tiles.placeOnRandomTile(hitbox, assets.tile`tile156`)
            timer.after(100, function () {
                Movement(true)
                color.startFadeFromCurrent(color.originalPalette, 500)
            })
        })
    }
}
function gameLoad () {
    if (!(blockSettings.exists("SaveFile?"))) {
        playTimeMinutes = 0
        playTimeSeconds = 0
    } else {
        playTimeSeconds = blockSettings.readNumber("Seconds")
        playTimeMinutes = blockSettings.readNumber("Minutes")
    }
}
function playDialouge (pic: Image, text: string, autoskip: boolean, Talk: boolean, Blink: boolean) {
    cofirmTextChange = false
    inDialouge = true
    textbox = sprites.create(assets.image`DialogBox`, SpriteKind.Food)
    textbox.setFlag(SpriteFlag.RelativeToCamera, true)
    textbox.z = 32
    dialougeSprite = sprites.create(pic, SpriteKind.Food)
    dialougeSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    dialougeSprite.left = 30
    dialougeSprite.z = 32
    dialouge = fancyText.create(text, 170, 0, customFont.Determination)
    dialouge.setFlag(SpriteFlag.RelativeToCamera, true)
    dialouge.left = 84
    dialouge.z = 32
    dialouge.setKind(SpriteKind.Text)
    fancyText.setTextFlag(dialouge, fancyText.Flag.ChangeHeightWhileAnimating, false)
    fancyText.setAnimationSound(dialouge, music.createSoundEffect(
    WaveShape.Triangle,
    775,
    562,
    255,
    86,
    100,
    SoundExpressionEffect.Warble,
    InterpolationCurve.Linear
    ))
    if (hitbox.y < scene.cameraProperty(CameraProperty.Y)) {
        textbox.top = 56
        dialougeSprite.top = 72
        dialouge.top = 64
    } else {
        textbox.top = 0
        dialougeSprite.top = 16
        dialouge.top = 8
    }
    if (autoskip) {
        fancyText.animateAtSpeed(dialouge, fancyText.TextSpeed.Fast, fancyText.AnimationPlayMode.UntilDone)
    } else {
        if (fancyText.remainingAnimationTime(dialouge) != 0) {
            fancyText.animateAtSpeed(dialouge, fancyText.TextSpeed.Fast, fancyText.AnimationPlayMode.InBackground)
            animation.runImageAnimation(
            dialougeSprite,
            assets.animation`myAnim9`,
            200,
            true
            )
            pauseUntil(() => cofirmTextChange)
        } else {
            if (Blink) {
                animation.runImageAnimation(
                dialougeSprite,
                assets.animation`myAnim8`,
                200,
                true
                )
                pauseUntil(() => cofirmTextChange)
            }
        }
    }
    cofirmTextChange = false
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    inDialouge = false
}
let dialougeSprite: Sprite = null
let textbox: Sprite = null
let soundeffect: SoundBuffer = null
let Logo3: fancyText.TextSprite = null
let Logo2: fancyText.TextSprite = null
let dog: Sprite = null
let StartGameText = ""
let Logo: Sprite = null
let myTextSprite7: fancyText.TextSprite = null
let myTextSprite8: fancyText.TextSprite = null
let myTextSprite6: fancyText.TextSprite = null
let myTextSprite4: fancyText.TextSprite = null
let myTextSprite3: fancyText.TextSprite = null
let myTextSprite5: fancyText.TextSprite = null
let myTextSprite2: fancyText.TextSprite = null
let myTextSprite: fancyText.TextSprite = null
let playTimeMinutes = 0
let playTimeSeconds = 0
let cofirmTextChange = false
let save: Sprite = null
let frisk: Sprite = null
let hitbox: Sprite = null
let Menu: Sprite = null
let dialouge: fancyText.TextSprite = null
let inDialouge = false
let inventory = false
let funValue = 0
let titleScreen = false
music.stopAllSounds()
color.setColor(11, color.parseColorString("808080"), 0)
color.setColor(2, color.parseColorString("cdcdcd"), 0)
color.setColor(5, color.parseColorString("FFFF00"), 0)
console.logValue("GameSaved?", false)
titleScreen = true
funValue = randint(1, 100)
GameStart()
gameLoad()
titleScreen = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 256
    export const ARCADE_SCREEN_HEIGHT = 192
}
stats.turnStats(true)
// Synchronize Frisk with the Hitbox every frame
game.onUpdate(function () {
    // Smoothly update Frisk's position to exactly match Hitbox
    frisk.x = hitbox.x
    frisk.bottom = hitbox.bottom
})
game.onUpdateInterval(1000, function () {
    if (playTimeSeconds <= 58) {
        playTimeSeconds += 1
    } else if (playTimeSeconds == 59) {
        playTimeSeconds = 0
        playTimeMinutes += 1
    }
    console.logValue("Seconds", playTimeSeconds)
    console.logValue("Minutes", playTimeMinutes)
})
