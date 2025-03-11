<?php
if (!defined('ABSPATH')) {
	exit;
}

/**
 * HTML Search form generation
 */
function cas_get_search_form() {
	ob_start(); ?>
	<form class="cas-search-form" role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
		<input type="hidden" name="search-type" value="custom" />

		<div class="cas-search-wrapper">
			<input
				class="cas-search-input"
				type="text"
				name="s"
				id="cas-search"
				placeholder="<?php esc_attr_e('Поиск', 'custom-ajax-search'); ?>"
				autocomplete="on"
			/>

			<button type="submit" id="cas-search-submit" class="cas-search-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z" fill="#4A4A4A"/><path d="M21.9999 22.7499C21.8099 22.7499 21.6199 22.6799 21.4699 22.5299L19.4699 20.5299C19.1799 20.2399 19.1799 19.7599 19.4699 19.4699C19.7599 19.1799 20.2399 19.1799 20.5299 19.4699L22.5299 21.4699C22.8199 21.7599 22.8199 22.2399 22.5299 22.5299C22.3799 22.6799 22.1899 22.7499 21.9999 22.7499Z" fill="#4A4A4A"/></svg>
            </button>

            <button type="submit" id="cas-search-close" class="cas-search-close-button" style="display: none;">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_0_2689)"><path d="M38 12.83L35.17 10L24 21.17L12.83 10L10 12.83L21.17 24L10 35.17L12.83 38L24 26.83L35.17 38L38 35.17L26.83 24L38 12.83Z" fill="#4A4A4A"/></g><defs><clipPath id="clip0_0_2689"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>

                <span class="cas-search-close--text">(Esc)</span>
            </button>

            <div id="cas-search-loader" class="cas-search-loader" style="display: none;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8.00023L18.3642 5.63609M5.63631 18.364L8.00026 16M17.6566 12H21M3 12H6.34315M12 6.34342L12 3M12 21L12 17.6569M8.00023 8.00023L5.63609 5.63609M18.364 18.364L16 16" stroke="#4A4A4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
		</div>

		<ul id="cas-search-results" class="cas-ajax-search"></ul>

        <button type="submit" id="cas-form-close" class="cas-search-close-button cas-form-close-button" style="display: none;">
            <svg width="24" height="24" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.6668 19.7082H14.3552L24.6035 9.69275L22.0002 7.1665L7.3335 21.4998L22.0002 35.8332L24.5852 33.3069L14.3552 23.2915H36.6668V19.7082Z" fill="#4A4A4A" fill-opacity="0.87"></path></svg>

            <?php esc_html_e('Назад', 'custom-ajax-search'); ?>
        </button>
	</form>
	<?php
	return ob_get_clean();
}
