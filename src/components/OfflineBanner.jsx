import { useTranslation } from 'react-i18next'

const OfflineBanner = ({ isOffline }) => {
  const { t } = useTranslation()
  if (!isOffline) return null
  return <div className="offline-banner">{t('states.offline')}</div>
}

export default OfflineBanner
