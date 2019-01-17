import React, { PureComponent, Fragment } from 'react';
import { View } from 'react-native';

import { getTimeFromNow } from '../../../utils/time';
// Constants

// Components
import Comments from '../container/commentsContainer';
import { PostBody, PostHeaderDescription } from '../../postElements';
import { Upvote } from '../../upvote';
import { IconButton } from '../../iconButton';
import { Tag } from '../../basicUIElements';

// Constants

// Components

// Styles
import styles from './commentStyles';

class CommentLineView extends PureComponent {
  /* Props
   * ------------------------------------------------
   *   @prop { type }    name                - Description....
   */

  constructor(props) {
    super(props);
    this.state = {
      loadCommentReplies: props.loadCommentReplies,
    };
  }

  // Component Life Cycles

  // Component Functions

  render() {
    const {
      index,
      item,
      avatarSize,
      commentNumber,
      currentAccountUsername,
      handleOnEditPress,
      handleOnReplyPress,
      handleOnUserPress,
      isLoggedIn,
      marginLeft,
      fetchPost,
      hideMoreButton,
    } = this.props;
    const { loadCommentReplies } = this.state;

    return (
      <View key={index}>
        <PostHeaderDescription
          key={item.permlink}
          // date={intl.formatRelative(item.created)}
          date={getTimeFromNow(item.created)}
          name={item.author}
          reputation={item.author_reputation}
          size={avatarSize || 24}
        />
        <View
          style={{
            marginLeft: marginLeft || 29,
            flexDirection: 'column',
            marginTop: -10,
          }}
        >
          <PostBody isComment handleOnUserPress={handleOnUserPress} body={item.body} />
          <View style={{ flexDirection: 'row' }}>
            {isLoggedIn && (
              <Fragment>
                <Upvote isShowPayoutValue content={item} />
                <IconButton
                  size={18}
                  iconStyle={{ color: '#c1c5c7' }}
                  style={{ marginLeft: 10 }}
                  name="reply"
                  onPress={() => handleOnReplyPress && handleOnReplyPress(item)}
                  iconType="MaterialIcons"
                />
                {currentAccountUsername === item.author && (
                  <IconButton
                    size={18}
                    iconStyle={{ color: '#c1c5c7' }}
                    style={{ marginLeft: 10 }}
                    name="create"
                    onPress={() => handleOnEditPress && handleOnEditPress(item)}
                    iconType="MaterialIcons"
                  />
                )}
                {!hideMoreButton && item.children > 0 && (
                  <View style={styles.tagWrapper}>
                    <Tag
                      value={`${item.children} more replies`}
                      iconName="expand-more"
                      onPress={() => {
                        this.setState({ loadCommentReplies: true });
                      }}
                    />
                  </View>
                )}
              </Fragment>
            )}
          </View>
        </View>
        {loadCommentReplies && (
          <View style={{ marginLeft: marginLeft || 29 }}>
            {commentNumber !== 8 && (
              <Comments
                commentNumber={commentNumber ? commentNumber * 2 : 1}
                marginLeft={20}
                avatarSize={avatarSize || 16}
                author={item.author}
                permlink={item.permlink}
                commentCount={item.children}
                fetchPost={fetchPost}
                hideMoreButton
                loadCommentReplies={loadCommentReplies}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

export default CommentLineView;
