const MailIcon = ({ className, iconType }) => {
    switch (iconType?.toUpperCase()) {
        case 'USPS':
            return (
                <img className={className} src="/usps.png" />
            )
        case 'UPS':
            return (
                <img className={className} src="/ups.png" />
            );
        case 'FEDEX':
            return (
                <img className={className} src="/fedex.png" />
            )
        default:
            return (
                <svg
                    className={className} 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="25" 
                    height="25" 
                    viewBox="0 0 32 32"
                >
                    <g fill="none">
                        <path fill="#f3c07b" d="M15.35 2.143c.32-.19.71-.19 1.02 0l10.92 6.64c.26.16.42.45.42.75L15.86 17.5L4 9.632v-.1c0-.3.16-.59.42-.74z"/>
                        <path fill="#ffce7c" d="m15.856 16.246l11.36-6.9a.328.328 0 0 1 .496.282v12.34a1.733 1.733 0 0 1-.83 1.48l-10.64 6.46a.272.272 0 0 1-.087.03a.268.268 0 0 1-.083.011a.895.895 0 0 1-.682-.083h.006L13 19z"/>
                        <path fill="#e19747" d="M15.86 29.622v-13.37l-11.35-6.9a.331.331 0 0 0-.51.28v12.34c0 .61.32 1.17.83 1.48l10.57 6.42a.3.3 0 0 0 .46-.25"/>
                        <path fill="#d3d3d3" d="M14.5 26.782v-1.96c0-.23-.12-.44-.31-.56l-2.8-1.69c-.19-.11-.43.02-.43.24v1.96c0 .23.12.44.31.56l2.8 1.69c.19.11.43-.02.43-.24"/>
                        <path fill="#8c5543" d="M11.76 16.553v-4.561l-3.28-.22v3.16c0 .1.05.2.14.26l2.68 1.63c.2.11.46-.03.46-.27"/>
                        <path fill="#a56953" d="m20.34 4.563l-11.86 7.21l3.28 2l11.86-7.2z"/>
                    </g>
                </svg>
            )
    }
}

export default MailIcon;