type SpacerProps = { height?: number, width?: number }

function Spacer({height = 0, width = 0}: SpacerProps) {
  return <div style={{
    height: `${height}rem`,
    width: `${width}rem`
  }}></div>
}

export default Spacer;