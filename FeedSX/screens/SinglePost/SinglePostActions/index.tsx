import React, { useState } from 'react'
import { View, Text } from 'react-native'
import SinglePostUI from '../SinglePostUI'
import { SinglePostStateProps } from '../../../Models/SinglePostModels'
import Icon  from 'react-native-vector-icons/FontAwesome'


const SinglePostActions = () => {
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)
    
    const likeButtonClick = () => {
        setLiked(!liked)
    }
    const commentButtonClick = () => {
    }
    const shareButtonClick = () => {
    }
    const bookmarkButtonClick = () => {
        setSaved(!saved)
    }
    const likeIcon = () => {
        return <Icon name="thumbs-o-up" size={22} color="#000" />
    }
    const shareIcon = () => {
        return (<Icon name="heart-o" size={22} color="#000" />)
    }
    const commentIcon = () => {
        return (<Icon name="share-square-o" size={22} color="#000" />)
    }

    const props: SinglePostStateProps = {
        showBookMarkIcon: true,
        showShareIcon: true,
        likedState: liked,
        savedState: saved,
        likePlaceholder: 'Like',
        likeCount: 10,
        commentPlaceholder: 'Comment',
        noCommentPlaceholder: 'Add Comment',
        commentCount: 0,
        // footerTextStyle: {color:'green', paddingVertical:10}
    };

    return (<>
        <SinglePostUI
            {...props}
            // commentIcon={commentIcon}
            // likeIcon={likeIcon}
            // shareIcon={shareIcon}
            bookmarkPress={bookmarkButtonClick}
            likePress={likeButtonClick}
            commentPress={commentButtonClick}
            sharePress={shareButtonClick} />
    </>
    )
}

export default SinglePostActions