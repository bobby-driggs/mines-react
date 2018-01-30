import React from 'react';

class SettingsInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const width = this.props.width;
        const height = this.props.height;
        const mineCount = this.props.mineCount;

        return (
            <form className="pure-form pure-form-stacked">
                <fieldset>
                    <legend>Settings</legend>

                    <div className="pure-g">
                        <div className="pure-u-1 pure-u-md-1-3">
                            <label htmlFor="width">Width</label>
                            <input id="width" className="pure-u-23-24" type="text" value={width} onChange={(event) => this.props.onSettingsChange(event, "WIDTH")} />
                        </div>

                        <div className="pure-u-1 pure-u-md-1-3">
                            <label htmlFor="height">Height</label>
                            <input id="height" className="pure-u-23-24" type="text" value={height} onChange={(event) => this.props.onSettingsChange(event, "HEIGHT")} />
                        </div>

                        <div className="pure-u-1 pure-u-md-1-3">
                            <label htmlFor="mine-count">Mine Count</label>
                            <input id="mine-count" className="pure-u-23-24" type="text" value={mineCount} onChange={(event) => this.props.onSettingsChange(event, "MINECOUNT")} />
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default SettingsInput;
