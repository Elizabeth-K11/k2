/*меню*/
$(document).ready(function() {
    $('.menu-burger__header').click(function(){
    $('.menu-burger__header').toggleClass('open-menu');
    $('.nav').toggleClass('open-menu');
    });
    });





// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/details/1_20210430_20210430_1249/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": " Tantra Yoga Masters - Escape Gravity",
                "duration": "3:29",
                "file": "1"
            }, {
                "track": 2,
                "name": "Serenity Calls - Quick Healing ",
                "duration": "2:09",
                "file": "2"
            }, {
                "track": 3,
                "name": "Rebecca Shaw - Kids Study Piano",
                "duration": " 2:48",
                "file": "3"
            }, {
                "track": 4,
                "name": "Project Divinity - The Spirit Arises",
                "duration": "  2:17",
                "file": "4"
            }, {
                "track": 5,
                "name": " Project Divinity - Inside A Cocoon",
                "duration": " 5:26",
                "file": "5"
            }, {
                "track": 6,
                "name": "Project Divinity - Floating ",
                "duration": "4:25",
                "file": "6"
            }, {
                "track": 7,
                "name": "Project Divinity - Ethereal Void  ",
                "duration": "4:12",
                "file": "7"
            }, {
                "track": 8,
                "name": "Project Divinity - Eternal Love   ",
                "duration": " 3:35",
                "file": "8"
            }, {
                "track": 9,
                "name": "Celestial Aeon Project (Matti Paalanen) - Cinematic Piano ",
                "duration": "1:59",
                "file": "9"
            }, {
                "track": 10,
                "name": " Lucid But Dreaming - Lucid Dream ",
                "duration": " 2:54",
                "file": "10"
            },],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});

