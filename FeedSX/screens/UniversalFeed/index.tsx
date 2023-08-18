import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import {LMPost} from '../../components'
import { PostStateProps } from '../../Models/PostModel'


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
        footerTextStyle: {},
        authorName: 'Theresa Webb',
        postedTime: '2h',
        showEdited: true,
        showLabel: true,
        labelType: 'Admin',
        showPin: false,
        mediaUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhNhTcdpoN6c-rzLj336_o2WpgLgeqirPchSSBerB&s',
        postText:`Here is a list of social media tools to help you get started with your marketing initiatives.`,
        attachment_type: [3]
    };

    return(
        <ScrollView>
            <LMPost {...props}/>
        </ScrollView>
    )
}

export default UniversalFeed