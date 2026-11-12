import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  target,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
}) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
    disabled ? styles.disabled : '',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noreferrer' : undefined} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
