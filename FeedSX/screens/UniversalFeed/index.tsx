import React, { useState } from 'react'
import { View, Text } from 'react-native'
import {LMPost} from '../../components'
import { PostStateProps } from '../../Models/PostModels'


const UniversalFeed = () => {
    
    // readonly props consumed by UI component
    const props: PostStateProps = {
        showBookMarkIcon: true,
        showShareIcon: true,
        likedState: true,
        savedState: false,
        likePlaceholder: 'Like',
        likeCount: 10,
        commentPlaceholder: 'Comment',
        noCommentPlaceholder: 'Add Comment',
        commentCount: 0,
        footerTextStyle: {}
    };

    return(
        <LMPost {...props}/>
    )
}

export default UniversalFeed