import React from 'react'
import styles from './style.module.css'
import ReactSlider from 'react-slider'
import { CrosshairSettingsFields, ICrosshairSettings } from './types'
import { SketchPicker } from 'react-color'

const defaultSettings: ICrosshairSettings = {
  width: 1,
  height: 20,
  gap: 2,
  color: 'white'
}

const CrosshairPage: React.FC = () => {

  const [crosshairSettings, setCrosshairSettings] = React.useState<ICrosshairSettings>(defaultSettings)

  const crosshairGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `${crosshairSettings.height}px ${crosshairSettings.width}px ${crosshairSettings.height}px`,
    gridTemplateRows: `${crosshairSettings.height}px ${crosshairSettings.width}px ${crosshairSettings.height}px`,
    gap: crosshairSettings.gap
  }

  const handleMoveSlider = (state: number, property: CrosshairSettingsFields) => {
    const newSettings = { ...crosshairSettings }
    newSettings[property] = state
    setCrosshairSettings(newSettings)
  }

  React.useEffect(() => {
    const sketchPickerElement = document.getElementsByClassName('sketch-picker')[0] as HTMLElement
    sketchPickerElement.style.background = 'black'
    const [palete, sliders, inputs, exists] = Array.from(sketchPickerElement.childNodes) as HTMLElement[]
    exists.remove()
    for (let i = inputs.childNodes.length - 1; i > 0; i--) {
      inputs.removeChild(inputs.childNodes[i]);
    }
    const inputContainer = inputs.childNodes[0].childNodes[0] as HTMLElement
    const inputContainerInput = inputContainer.childNodes[0] as HTMLElement
    inputContainer.style.display = 'flex'
    inputContainerInput.style.backgroundColor = '#3B3B3B'
    inputContainerInput.style.color = 'grey'
  }, [])

  return (
    <div>
      <h1>Custom your crosshair</h1>
      <div className={styles.preview}>
        <div className={styles.crosshairScreen}>
          <div className={styles.crosshair} style={crosshairGridStyles}>
            <div
              className={styles.crosshairDetail}
              style={{ backgroundColor: crosshairSettings.color, gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 1, gridRowEnd: 2 }}
            >
              <div
                className={styles.crosshairDetailInside}
                style={{ height: crosshairSettings.width / 2 + 'px', top: '100%' }}
              ></div>
            </div>
            <div
              className={styles.crosshairDetail}
              style={{ backgroundColor: crosshairSettings.color, gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 2, gridRowEnd: 3 }}
            >
              <div
                className={styles.crosshairDetailInside}
                style={{ width: crosshairSettings.width / 2 + 'px', left: '100%' }}
              ></div>
            </div>
            <div
              className={styles.crosshairDetail}
              style={{ backgroundColor: crosshairSettings.color, gridColumnStart: 3, gridColumnEnd: 4, gridRowStart: 2, gridRowEnd: 3 }}
            >
              <div
                className={styles.crosshairDetailInside}
                style={{ width: crosshairSettings.width / 2 + 'px', right: '100%' }}
              ></div>
            </div>
            <div
              className={styles.crosshairDetail}
              style={{ backgroundColor: crosshairSettings.color, gridColumnStart: 2, gridColumnEnd: 3, gridRowStart: 3, gridRowEnd: 4 }}
            >
              <div
                className={styles.crosshairDetailInside}
                style={{ height: crosshairSettings.width / 2 + 'px', bottom: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SketchPicker
          color={crosshairSettings.color}
          onChange={state => setCrosshairSettings({ ...crosshairSettings, color: state.hex })}
        />
        <div>
          <input
            type='text'
            value={crosshairSettings.width}
            onChange={e => Number(e.target.value) <= 30 && setCrosshairSettings({ ...crosshairSettings, width: Number(e.target.value) })}
          />
          <ReactSlider
            className={styles.slider}
            min={1}
            max={30}
            defaultValue={crosshairSettings.width}
            thumbClassName="example-thumb"
            trackClassName="example-track"
            renderThumb={(props, state) => <div {...props} className={styles.sliderCircle}></div>}
            onChange={state => handleMoveSlider(state, CrosshairSettingsFields.WIDTH)}
          />
        </div>
        <div>
          <input
            type='text'
            value={crosshairSettings.height}
            onChange={e => Number(e.target.value) <= 30 && setCrosshairSettings({ ...crosshairSettings, height: Number(e.target.value) })}
          />
          <ReactSlider
            className={styles.slider}
            min={1}
            max={30}
            defaultValue={crosshairSettings.height}
            thumbClassName="example-thumb"
            trackClassName="example-track"
            renderThumb={(props, state) => <div {...props} className={styles.sliderCircle}></div>}
            onChange={state => handleMoveSlider(state, CrosshairSettingsFields.HEIGHT)}
          />
        </div>
        <div>
          <input
            type='text'
            value={crosshairSettings.gap}
            onChange={e => Number(e.target.value) <= 15 && setCrosshairSettings({ ...crosshairSettings, gap: Number(e.target.value) })}
          />
          <ReactSlider
            className={styles.slider}
            min={0}
            max={15}
            defaultValue={crosshairSettings.gap}
            thumbClassName="example-thumb"
            trackClassName="example-track"
            renderThumb={(props, state) => <div {...props} className={styles.sliderCircle}></div>}
            onChange={state => handleMoveSlider(state, CrosshairSettingsFields.GAP)}
          />
        </div>
      </div>
    </div>
  )
}

export default CrosshairPage