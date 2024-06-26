import type { Site } from '~/lib/db/types'
import { useEditSite } from '~/lib/sites.client'
import { ChangeEventHandler, useState } from 'react'
import Button from '../ui/Button'
import Link from '../ui/Link'
import DeleteSiteButton from './DeleteSiteButton'
import SiteScript from './SiteScript'

interface SiteSettingsProps {
  site: Site
}

const SiteSettings: React.FC<SiteSettingsProps> = ({ site }) => {
  const [showScript, setShowScript] = useState(false)

  const editSite = useEditSite(site.name)

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = async event => {
    const target = event.currentTarget
    await editSite.mutateAsync({ [target.name]: target.checked })
  }

  return (
    <section className="mb-8 space-y-6">
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>
      <div>
        <label className="mr-2" htmlFor="isPublic">
          Make the feedback for this site public
        </label>
        <input
          type="checkbox"
          className={'form-checkbox'}
          checked={site.isPublic}
          id="isPublic"
          name="isPublic"
          onChange={handleCheckboxChange}
        />
      </div>
      <div>
        <label className="mr-2" htmlFor="allowFeedback">
          Collect feedback for this site
        </label>
        <input
          type="checkbox"
          className={'form-checkbox'}
          checked={site.allowFeedback}
          id="allowFeedback"
          name="allowFeedback"
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="space-x-4">
        <Link href={`/api/sites/${site.name}/csv`} target="_blank" download={`${site.name}.csv`}>
          Export feedback as CSV
        </Link>
        <Link
          href={`/api/sites/${site.name}/feedback`}
          target="_blank"
          download={`${site.name}.json`}
        >
          Export feedback as JSON
        </Link>
      </div>
      <hr />
      <Button variant="primary" onClick={() => setShowScript(p => !p)}>
        {showScript ? 'Hide' : 'Show'} Script
      </Button>
      {showScript && <SiteScript siteName={site.name} />}
      <hr />
      <DeleteSiteButton siteName={site.name} />
    </section>
  )
}

export default SiteSettings
