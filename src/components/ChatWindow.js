import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import EmojiPicker from 'emoji-picker-react';
import MessageItem from './MessageItem';

function ChatWindow({ user }) {
    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if( SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const body = useRef();
    const [ emojiOpen, setEmojiOpen ] = useState(false);
    const [ text, setText ] = useState('');
    const [ listening, setListening ] = useState(false);
    const [ list, setList ] = useState([ 
        { author: 1, body: 'ola cureguinha 1' },
        { author: 123, body: 'ola cureguinha 2' },
        { author: 1234, body: 'ola cureguinha 3' },
        { author: 12345, body: 'ola cureguinha 4' },
        { author: 123456, body: 'ola cureguinha 5' },
        { author: 1234567, body: 'ola cureguinha 6' },
        { author: 12345678, body: 'ola cureguinha 7' },
        { author: 123456789, body: 'ola cureguinha 8' },
        { author: 1234567890, body: 'ola cureguinha 9' },
        { author: 123456, body: 'ola cureguinha 10' },
        { author: 123, body: 'ola cureguinha 11' },
        { author: 1234, body: 'ola cureguinha 12' },
        { author: 12345678, body: 'ola cureguinha 13' },
        { author: 1234, body: 'ola cureguinha 14' },
        { author: 1234, body: 'ola cureguinha 15' },
        { author: 123567, body: 'ola cureguinha 16' },
        { author: 12345, body: 'ola cureguinha 17' },
        { author: 12346789, body: 'ola cureguinha 18' },
        { author: 1234567890, body: 'ola cureguinha 19' },
        { author: 123, body: 'ola cureguinha 20' },
        { author: 123, body: 'ola cureguinha 21' },
        { author: 12, body: 'ola cureguinha 22' },
        { author: 123, body: 'ola cureguinha 23' },
        { author: 1234, body: 'ola cureguinha 24' },
        { author: 123, body: 'ola cureguinha 25' },
        { author: 123, body: 'ola cureguinha 26' },
        { author: 12345, body: 'ola cureguinha 27' },
        { author: 12345678, body: 'ola cureguinha 28' },
        { author: 12345, body: 'ola cureguinha 29' },
        { author: 1234567, body: 'ola cureguinha 30' },
        { author: 1234567890, body: 'ola cureguinha 31' },
        { author: 123456789, body: 'ola cureguinha 32' },
        { author: 1234, body: 'ola cureguinha 33' },
        { author: 123, body: 'ola cureguinha 34' },
        { author: 1, body: 'ola cureguinha 35' },
        { author: 12, body: 'ola cureguinha 36' },
        { author: 1234, body: 'ola cureguinha 37' },
        { author: 123456, body: 'ola cureguinha 38' },
        { author: 12345, body: 'ola cureguinha 39' },
        { author: 12, body: 'ola cureguinha 40' },
        { author: 1234567, body: 'ola cureguinha 41' },
        { author: 12345, body: 'ola cureguinha 42' },
        { author: 1, body: 'ola cureguinha 43' },
        { author: 12, body: 'ola cureguinha 44' },
        { author: 12345, body: 'ola cureguinha 45' },
        { author: 123, body: 'ola cureguinha 46' },
        { author: 123, body: 'ola cureguinha 47' },
        { author: 12345678, body: 'ola cureguinha 48' },
        { author: 123, body: 'ola cureguinha 49' },
        { author: 1, body: 'ola cureguinha 50' },
        { author: 123, body: 'ola cureguinha 51' },
        { author: 1, body: 'ola cureguinha 52' },
        { author: 123, body: 'ola cureguinha 53' },
        { author: 1234, body: 'ola cureguinha 54' },
        { author: 12345, body: 'ola cureguinha 55' },
        { author: 123, body: 'ola cureguinha 56' },
        { author: 1234567, body: 'ola cureguinha 57' },
        { author: 12, body: 'ola cureguinha 58' },
        { author: 1, body: 'ola cureguinha 59' },
        { author: 12345, body: 'ola cureguinha 60' },
        { author: 1234, body: 'ola cureguinha 61' },
        { author: 123456, body: 'ola cureguinha 62' },
        { author: 12, body: 'ola cureguinha 63' },
        { author: 1234567, body: 'ola cureguinha 64' },
        { author: 1, body: 'ola cureguinha 65' },
        { author: 12345678, body: 'ola cureguinha 66' },
        { author: 1234567890, body: 'ola cureguinha 67' },
        { author: 1234567890, body: 'ola cureguinha 68' },
        { author: 1234567, body: 'ola cureguinha 69' },
        { author: 12, body: 'ola cureguinha 70' },
        { author: 123456789, body: 'ola cureguinha 71' },
        { author: 123456, body: 'ola cureguinha 72' },
        { author: 123, body: 'ola cureguinha 73' },
        { author: 1234567890, body: 'ola cureguinha 74' },
        { author: 1234567890, body: 'ola cureguinha 75' },
        { author: 1234, body: 'ola cureguinha 76' },
        { author: 12, body: 'ola cureguinha 77' },
        { author: 123456, body: 'ola cureguinha 78' },
        { author: 1, body: 'ola cureguinha 79' },
        { author: 1, body: 'ola cureguinha 80' },
        { author: 123, body: 'ola cureguinha 81' },
        { author: 12, body: 'ola cureguinha 82' },
        { author: 1, body: 'ola cureguinha 83' },
        { author: 12345, body: 'ola cureguinha 84' },
        { author: 1234, body: 'ola cureguinha 85' },
        { author: 123456, body: 'ola cureguinha 86' },
        { author: 1234567, body: 'ola cureguinha 87' },
        { author: 1234, body: 'ola cureguinha 88' },
        { author: 123, body: 'ola cureguinha 89' },
        { author: 123, body: 'ola cureguinha 90' },
     ]);

     useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
     }, [list])


    const handleEmojiClick = (e, emojiObject) => {
        setText( text + emojiObject.emoji );
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {
        if( recognition !== null ) {

            recognition.onstart = () => {
                setListening(true);
            }

            recognition.onend = () => {
                setListening(false);
            }

            recognition.oneresult = (e) => {
                setListening( e.results[0][0].transcript );
            }

            recognition.start();

        }
    }

    const handleSendClick = () => {
        
    }

    return (
        <div className = 'chatWindow'>
            
            <div className = 'chatWindow--header'>

                <div className = 'chatWindow--headerinfo'>
                    <img className = 'chatWindow--avatar' src = 'data:image/jpeg;base64,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' alt = '' />

                    <div className = 'chatWindow--name'>
                        Marco Aurélio
                    </div>

                    <div className = 'chatWindow--headerbuttons'>

                        <div className = 'chatWindow--btn'>
                            <SearchIcon style = {{ color: '#919191' }} />
                        </div>

                        <div className = 'chatWindow--btn'>
                            <AttachFileIcon style = {{ color: '#919191' }} />
                        </div>

                        <div className = 'chatWindow--btn'>
                            <MoreVertIcon style = {{ color: '#919191' }} />
                        </div>

                    </div>
                </div>

            </div>

            <div ref = {body} className = 'chatWindow--body'>
                {list.map((item, key) => (
                    <MessageItem 
                        key = {key}
                        data = {item}
                        user = {user}
                    />
                ))}
            </div>

            <div className = 'chatWindow--emojiarea' style = {{ height: emojiOpen ? '200px' : '0px' }}>
                <EmojiPicker 
                    disableSearchBar 
                    disableSkinTonePicker 
                    onClick = {handleEmojiClick}
                    
                />
            </div>

            <div className = 'chatWindow--footer'>

                <div className = 'chatWindow--pre'>

                    <div className = 'chatWindow--btn' onClick = {handleCloseEmoji} style = {{ width: emojiOpen?40:0 }} >
                        <CloseIcon style = {{ color: '#919191' }} />
                    </div>

                    <div className = 'chatWindow--btn' onClick = {handleOpenEmoji}>
                        <InsertEmoticonIcon style = {{ color: emojiOpen?'#009688' : '#919191' }} />
                    </div>

                </div>

                <div className = 'chatWindow--inputarea'>
                    <input 
                        className = 'chatWindow--input' 
                        type = 'text' 
                        placeholder = 'Digite uma mensagem'
                        value= {text}
                        onChange = {e => setText(e.target.value)}
                    />
                </div>

                <div className = 'chatWindow--pos'>

                    {text === '' &&                    
                        <div onClick = {handleMicClick} className = 'chatWindow--btn'>
                            <MicIcon style = {{ color: listening ? '#126ECE' : '#919191' }} />
                        </div>
                    }

                    {text !== '' &&                    
                        <div onClick = {handleSendClick} className = 'chatWindow--btn'>
                            <SendIcon style = {{ color: '#919191' }} />
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default ChatWindow;