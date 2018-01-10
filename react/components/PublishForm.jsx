import React from 'react';
import PreviewDropzone from './PreviewDropzone.jsx';
import PublishTitleInput from './PublishTitleInput.jsx';
import ChannelSelector from './ChannelSelector.jsx';
import PublishUrlInput from './PublishUrlInput.jsx';
import PublishThumbnailInput from './PublishThumbnailInput.jsx';
import PublishMetadataInputs from './PublishMetadataInputs.jsx';
import AnonymousOrChannelSelect from './AnonymousOrChannelSelect.jsx';

import { selectFile, clearFile, updateLoggedInChannel } from '../actions';
import { connect } from 'react-redux';
import { getCookie } from '../utils/cookies.js';

class PublishForm extends React.Component {
  constructor (props) {
    super(props);
    // set defaults
    this.state = {
      error             : null,
      showMetadataInputs: false,
    };
    this.publish = this.publish.bind(this);
  }
  componentWillMount () {
    // check for whether a channel is logged in
    // if so, set the loggedInChannel to the channel name
    const loggedInChannelName = getCookie('channel_name');
    const loggedInChannelShortId = getCookie('short_channel_id');
    const loggedInChannelLongId = getCookie('long_channel_id');
    this.props.onChannelUpdate(loggedInChannelName, loggedInChannelShortId, loggedInChannelLongId);
  }
  publish () {
    // publish the asset
  }
  render () {
    return (
      <div className="row row--no-bottom">
        <div className="column column--10">

          <PublishTitleInput />

        </div>
        <div className="column column--5 column--sml-10" >
          <div className="row row--padded">

            <PreviewDropzone />
            { (this.props.fileType === 'video/mp4') && <PublishThumbnailInput /> }

          </div>
        </div>
        <div className="column column--5 column--sml-10 align-content-top">
          <div id="publish-active-area" className="row row--padded">

            <PublishUrlInput />
            <AnonymousOrChannelSelect />
            <ChannelSelector />

            <PublishMetadataInputs
              updateUploaderState={this.props.updateUploaderState}
            />

            <div className="row row--padded row--wide">
              <div className="input-error" id="input-error-publish-submit" hidden="true">{this.state.error}</div>
              <button id="publish-submit" className="button--primary button--large" onClick={this.publish}>Publish</button>
            </div>

            <div className="row row--short align-content-center">
              <button className="button--cancel" onClick={this.props.onFileClear}>Cancel</button>
            </div>

            <div className="row row--short align-content-center">
              <p className="fine-print">By clicking 'Upload', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. <a className="link--primary" target="_blank" href="https://lbry.io/learn">Read more.</a></p>
            </div>

          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    fileType   : state.file.type,
    claim      : state.claim,
    thumbnail  : state.thumbnail,
    description: state.description,
    license    : state.license,
    nsfw       : state.nsfw,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFileSelect: (file) => {
      dispatch(selectFile(file));
    },
    onFileClear: () => {
      dispatch(clearFile());
    },
    onChannelUpdate: (name, shortId, longId) => {
      dispatch(updateLoggedInChannel(name, shortId, longId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishForm);
