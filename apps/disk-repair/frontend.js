/* ═══════════════════════════════════════════════════════════
   EthOS — Storage Manager  (unified, sidebar layout)
   Dyski · RAID · Wolumeny · Udostępnianie · Diagnostyka · SSD Cache
   ═══════════════════════════════════════════════════════════ */

/* ── Sharing helpers (pure, module-level) ──────────────── */
function _shBadge(ok, label) {
    if (ok === null) return `<span class="fm-badge shr-badge-loading">${label || '…'}</span>`;
    if (ok === 'off') return `<span class="fm-badge shr-badge-warn">${label || t('Wyłączony')}</span>`;
    return ok
        ? `<span class="fm-badge fm-badge-green">${label || t('Aktywny')}</span>`
        : `<span class="fm-badge shr-badge-err">${label || t('Nieaktywny')}</span>`;
}

function _shEsc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

function _shEscAttr(s) {
    return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const _SH_ALL_PROTOS = [
    { id: 'samba',  pkgId: 'sharing-samba',  icon: 'fa-windows',      label: 'Samba' },
    { id: 'nfs',    pkgId: 'sharing-nfs',    icon: 'fa-network-wired', label: 'NFS' },
    { id: 'dlna',   pkgId: 'sharing-dlna',   icon: 'fa-photo-video',  label: 'DLNA' },
    { id: 'webdav', pkgId: 'sharing-webdav', icon: 'fa-globe',        label: 'WebDAV' },
    { id: 'sftp',   pkgId: 'sharing-sftp',   icon: 'fa-lock',         label: 'SFTP' },
    { id: 'ftp',    pkgId: 'sharing-ftp',    icon: 'fa-upload',       label: 'FTP' },
];

/* ── App registration ──────────────────────────────────── */
AppRegistry['storage-manager'] = function (appDef) {
    createWindow('storage-manager', {
        title: t('Storage Manager'),
        icon: appDef.icon,
        iconColor: appDef.color,
        width: 1200,
        height: 800,
        minWidth: 900,
        minHeight: 600,
        onRender: (body) => renderStorageManager(body),
        onClose: () => { if (window.__smCleanup) { window.__smCleanup(); window.__smCleanup = null; } },
    });
};

