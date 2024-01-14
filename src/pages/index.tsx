import SvgIcon from '~virtual/svg-component'

export default function Index() {
  return (
    <div className="p-4 space-y-4">
      <div>Welcome !</div>
      <div>
        {/* unplugin-icons */}
        <IconCarbonLogoGithub />
      </div>
      <div>
        {/* unocss */}
        <div className="i-carbon-logo-github" />
      </div>
      <div>
        <SvgIcon name="community" className="h-6 w-6 text-$primary" />
      </div>
    </div>
  )
}
